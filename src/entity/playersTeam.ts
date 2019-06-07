import { Schema, Document, model } from 'mongoose';
import { PlayersCharacter } from './playersCharacter';
import { User } from './user';

export interface PlayersTeam {
    name: string;
    user: User |  string;
    character_1: PlayersCharacter | string;
    character_2: PlayersCharacter | string;
    character_3: PlayersCharacter | string;
    character_4: PlayersCharacter | string;
    character_5: PlayersCharacter | string;
}

export interface PlayersTeamModel extends PlayersTeam, Document {
    // createTime: Date;
}

const playersTeamSchema = new Schema({
    name: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    character_1: { type: Schema.Types.ObjectId, ref: 'PlayersCharacter' },
    character_2: { type: Schema.Types.ObjectId, ref: 'PlayersCharacter' },
    character_3: { type: Schema.Types.ObjectId, ref: 'PlayersCharacter' },
    character_4: { type: Schema.Types.ObjectId, ref: 'PlayersCharacter' },
    character_5: { type: Schema.Types.ObjectId, ref: 'PlayersCharacter' },
}, {
    versionKey: false
})


export default model<PlayersTeamModel>('PlayersTeam', playersTeamSchema);