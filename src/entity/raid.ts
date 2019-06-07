import { Schema, Document, model } from 'mongoose';

export interface Raid {
    name: string;
    map: number[];
}

export interface RaidModel extends Raid, Document {
    // createTime: Date;
}

const raidSchema = new Schema({
    name: String,
    map: Array,
}, {
    versionKey: false
})


export default model<RaidModel>('Raid', raidSchema)