import { Schema, Document, model } from 'mongoose'
import { Timestamp } from 'bson';

export interface Server {
    name: string;
    uptime: {
        status: boolean,
        time: Timestamp
    };
    process: {
        status: boolean,
        time: Timestamp,
        name: string,
    };
}

export interface ServerModel extends Server, Document {
    // createTime: Date;
}

const serverSchema = new Schema({
    name: String,
    uptime: {
        status: Boolean,
        time: Timestamp
    },
    process: {
        status: Boolean,
        time: Timestamp,
        name: String,
    },
}, {
    versionKey: false
})


export default model<ServerModel>('Character', serverSchema)