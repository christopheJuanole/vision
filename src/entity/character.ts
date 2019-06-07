import { Schema, Document, model } from 'mongoose'

export interface Character {
    name: string;
    iconIndex: number;
    iconName: string;
    stars: number;
    isHidden: boolean;
    tags: [string];
}

export interface CharacterModel extends Character, Document {
    // createTime: Date;
}

const characterSchema = new Schema({
    name: String,
    iconIndex: Number,
    iconName: String,
    stars: Number,
    isHidden: Boolean,
    tags: [String],
}, {
    versionKey: false
})


export default model<CharacterModel>('Character', characterSchema)