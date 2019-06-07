import { Schema, Document, model } from 'mongoose';
import { User } from './user';


export interface PlayersCharacter {
    name: string;
    iconIndex: number;
    stars: number;
    redStars: number;
    gear: number;
    level: number;
    power: number;
    tags: [string];
    player: User | String;
}

export interface PlayersCharacterModel extends PlayersCharacter, Document {
    // createTime: Date;
}

const playersCharacterSchema = new Schema({
    name: String,
    iconIndex: Number,
    stars: Number,
    redStars: Number,
    gear: Number,
    level: Number,
    power: Number,
    tags: [String],
    player: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    versionKey: false
})


export default model<PlayersCharacterModel>('PlayersCharacter', playersCharacterSchema)