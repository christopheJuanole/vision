import { BaseContext } from 'koa';
import Team  from '../entity/team';

export default class TeamController {

    public static async getTeams(ctx: BaseContext) {

        ctx.body = await Team.find()
            .populate('character_1')
            .populate('character_2')
            .populate('character_3')
            .populate('character_4')
            .populate('character_5');

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

    public static async createTeam (ctx: BaseContext) {

        ctx.body = await Team.create({
            name: ctx.request.body.name,
            character_1: ctx.request.body.character_1,
            character_2: ctx.request.body.character_2,
            character_3: ctx.request.body.character_3,
            character_4: ctx.request.body.character_4,
            character_5: ctx.request.body.character_5,
        });
    }
}