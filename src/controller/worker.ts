import { BaseContext } from 'koa';
import Task  from '../entity/task';

export default class WorkerController {

    public static hello(ctx: BaseContext) {
        ctx.body = 'Hello !';
    }

    public static async getTask(ctx: BaseContext) {
        const workerId = ctx.params.workerId;
        // ctx.body = await Task.find({ worker: workerId });

        const newTask = await Task.create({
            action: 'isAlive',
            status: 'inProgress'
        });

        ctx.body = newTask;

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

    // public static async createServer (ctx: BaseContext) {
    //     ctx.body = await Server.create({
    //         name: ctx.request.body.name,
    //     });
    // }

    public static async updateTask (ctx: BaseContext) {
        const workerId = ctx.params.workerId;
        const taskId = ctx.params.taskId;
        const taskResult = ctx.request.body.result;

        const taskUpdate = {
            status: 'done',
            result: taskResult,
        }


        ctx.body = await Task.findOneAndUpdate(taskId, taskUpdate, {new: true});
    }
}
