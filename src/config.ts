import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface IConfig {
    port: number;
    dbPort: number;
    dbHost: string;
    database: string;
    dbUrl: string;
    debugLogging: boolean;
    dbsslconn: boolean;
    jwtSecret: string;
    databaseUrl: string;
}

const config: IConfig = {
    port: +process.env.PORT || 3000,
    dbPort: +process.env.DB_PORT || 57050,
    dbHost: process.env.HOST || 'localhost',
    dbUrl: process.env.DATABASE_URL || 'mongodb://localhost:57050/msf',
    database: process.env.DATABASE || 'msf',
    debugLogging: process.env.NODE_ENV == 'development',
    dbsslconn: process.env.NODE_ENV != 'development',
    jwtSecret: process.env.JWT_SECRET || 'shared-secret',
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:57050/msf'
};

export { config };