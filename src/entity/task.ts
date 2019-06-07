import { Schema, Document, model } from 'mongoose';
import { Character } from './character';

export interface Task {
    action: string;
    worker: string;
    status: string;
}

export interface TaskModel extends Task, Document {
    // createTime: Date;
}

const taskSchema = new Schema({
    action: String,
    worker: String,
    status: String,
}, {
    versionKey: false
})


export default model<TaskModel>('Task', taskSchema);
