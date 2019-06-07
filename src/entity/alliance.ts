import { Schema, Document, model } from 'mongoose';

export interface Alliance {
    name: string;
    members: [];
}

export interface AllianceModel extends Alliance, Document {
    // createTime: Date;
}

const allianceSchema = new Schema({
    name: String,
    members: Array,
}, {
    versionKey: false
})


export default model<AllianceModel>('Alliance', allianceSchema)