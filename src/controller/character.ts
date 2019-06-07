import { BaseContext } from 'koa';
import Character  from '../entity/character';
import User from '../entity/user';

export default class CharacterController {

    public static async getCharacters(ctx: BaseContext) {

        ctx.body = await Character.find({isHidden: {$nin: true}}).sort('iconIndex');

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

        ctx.body = await Character.create({
            name: ctx.request.body.name,
            iconIndex: ctx.request.body.iconIndex,
            iconName: ctx.request.body.iconName,
            stars: ctx.request.body.stars,
        });
    }

    public static async updateCharacter (ctx: BaseContext) {
        const updatedCharacter = ctx.request.body;
        delete updatedCharacter._id;
        const characterId = ctx.params.id;

        ctx.body = await Character.findOneAndUpdate({_id : characterId}, updatedCharacter, {new: true});
    }
}