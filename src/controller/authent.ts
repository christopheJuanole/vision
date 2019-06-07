import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import User  from '../entity/user';
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');
const tokenDuration = 60 * 60 * 12;

function newJWTToken(userData) {
    const profile = {
        userId: userData._id,
        username: userData.username,
    };
    const token = jwt.sign(profile, 'shared-secret', { expiresIn: tokenDuration });
    return { token: 'Bearer ' + token };
}

export default class AuthentController {


    // async login(ctx) {
    //     if (!ctx.request.body.login && !ctx.request.body.password) {
    //         ctx.throw(400, Errors.AUTHENT_DOESNT_EXIST);
    //     }
    //     const authData = await AuthentModel.findOne({
    //         'login': ctx.request.body.login,
    //         'password': sha1(ctx.request.body.password),
    //         userType: { $exists: true },
    //     });
    //     if (!authData) {
    //         ctx.throw(400, Errors.AUTHENT_DOESNT_EXIST);
    //     }
    //
    //     const user = await getUser(authData.userId, authData.userType);
    //     ctx.body = newJWTToken(authData, user);
    // },


    public static async login (ctx: BaseContext) {

        const user: any = await User.findOne({ username: ctx.request.body.username, password: sha1(ctx.request.body.password) });
        if (!user) {
            ctx.throw(400, 'login failed');
        }
        ctx.body = newJWTToken(user);
    }
    //
    // // silly endpoint to show where the payload data from the token gets stored
    public static async getJwtPayload (ctx: BaseContext) {
        // example just to set a different status
        // ctx.status = 201;
        // the body of the response will contain the information contained as payload in the JWT
        ctx.body = ctx.state.user;
        // ctx.body = ctx.state.user;
    }

}
