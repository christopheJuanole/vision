import { BaseContext } from 'koa';
import PlayersCharacter  from '../entity/playersCharacter';
import User from '../entity/user';

export default class PlayersCharacterController {

    public static async getCharacters(ctx: BaseContext) {

        ctx.body = await PlayersCharacter.find({player: ctx.state.user.userId}).sort('iconIndex');

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

    public static async createCharacter (ctx: BaseContext) {
        ctx.body = await PlayersCharacter.create({
            name: ctx.request.body.name,
            iconIndex: ctx.request.body.iconIndex,
            stars: ctx.request.body.stars,
            redStars: ctx.request.body.redStars,
            gear: ctx.request.body.gear,
            level: ctx.request.body.level,
            power: ctx.request.body.power,
            tags: ctx.request.body.tags,
            player: ctx.state.user.userId,
        });
    }

    public static async updateCharacter (ctx: BaseContext) {
        const updatedCharacter = ctx.request.body;
        delete updatedCharacter._id;
        const characterId = ctx.params.id;

        ctx.body = await PlayersCharacter.findOneAndUpdate({_id : characterId}, updatedCharacter, {new: true});
    }
}