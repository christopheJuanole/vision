import { Schema, Document, model } from 'mongoose';
import { Character } from './character';

export interface Team {
    name: string;
    character_1: Character | string;
    character_2: Character | string;
    character_3: Character | string;
    character_4: Character | string;
    character_5: Character | string;
}

export interface TeamModel extends Team, Document {
    // createTime: Date;
}

const teamSchema = new Schema({
    name: String,
    character_1: { type: Schema.Types.ObjectId, ref: 'Character' },
    character_2: { type: Schema.Types.ObjectId, ref: 'Character' },
    character_3: { type: Schema.Types.ObjectId, ref: 'Character' },
    character_4: { type: Schema.Types.ObjectId, ref: 'Character' },
    character_5: { type: Schema.Types.ObjectId, ref: 'Character' },
}, {
    versionKey: false
})


export default model<TeamModel>('Team', teamSchema);