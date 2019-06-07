import * as Koa from 'koa';
import * as jwt from 'koa-jwt';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import connectDatabase from './databases';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import * as PostgressConnectionStringParser from 'pg-connection-string';

import { logger } from './logging';
import { config } from './config';
import { router } from './routes';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });


const app = new Koa();

// Provides important security headers to make your app more secure
app.use(helmet());

// Enable cors with default options
app.use(cors());

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));

// Enable bodyParser with default options
app.use(bodyParser());

// JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
// /^\/(auth\/login|public)/
app.use(jwt({ secret: 'shared-secret', debug: false, passthrough: false }).unless({ path: [  /^\/(auth\/login|public)/,  /^\/worker/], method: 'OPTIONS' }));

// this routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port);


;(async () => {
    //const displayColors = config.get('displayColors')
    try {
        const dbUrl = config.dbUrl
        await connectDatabase(dbUrl)
        console.info(`Connected to ${dbUrl}`)
        //console.info(displayColors ? '\x1b[32m%s\x1b[0m' : '%s', `Connected to ${dbUrl}`)
    } catch (error) {
        console.error(error.toString())
        //console.error(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', error.toString())
    }
})()


// // Get DB connection options from env variable
// const connectionOptions = PostgressConnectionStringParser.parse(config.databaseUrl);
//
// // create connection with database
// // note that its not active database connection
// // TypeORM creates you connection pull to uses connections from pull on your requests
// createConnection({
//     type: 'mongodb',
//     host: config.dbHost,
//     port: config.dbPort,
//     database: config.database,
//     synchronize: true,
//     logging: false,
//     entities: [
//        'dist/entity/**/*.js'
//     ],
//     extra: {
//         ssl: config.dbsslconn, // if not development, will use SSL
//     }
//  }).then(async connection => {
//
//     const app = new Koa();
//
//     // Provides important security headers to make your app more secure
//     app.use(helmet());
//
//     // Enable cors with default options
//     app.use(cors());
//
//     // Logger middleware -> use winston as logger (logging.ts with config)
//     app.use(logger(winston));
//
//     // Enable bodyParser with default options
//     app.use(bodyParser());
//
//     // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
//     //app.use(jwt({ secret: config.jwtSecret }).unless({ path: '/', method: 'OPTIONS' }));
//
//     // this routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
//     app.use(router.routes()).use(router.allowedMethods());
//
//     app.listen(config.port);
//
//     console.log(`Server running on port ${config.port}`);
//
// }).catch(error => console.log('TypeORM connection error: ', error));
