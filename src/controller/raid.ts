import { BaseContext } from 'koa';
import Character  from '../entity/character';
import Raid from '../entity/raid';

export default class RaidController {

    public static async getRaids(ctx: BaseContext) {

        ctx.body = await Raid.find();

        // // get a user repository to perform operations with user
        // const userRepository: Repository<User> = getManager().getRepository(User);
        //
        // // load all users
        // const users: User[] = await userRepository.find();
        //
        // // return OK status code and loaded users array
        // ctx.status = 200;
        // ctx.body = users;
    }

    public static async createRaid (ctx: BaseContext) {

        ctx.body = await Raid.create({
            name: ctx.request.body.name,
            map: ctx.request.body.map
        });
    }
}