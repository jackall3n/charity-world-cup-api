import * as mongoose from "mongoose";
import {Schema} from "mongoose";

export interface ITeam extends mongoose.Document {
    name: string;
    group: any;
}

export const TeamSchema = new mongoose.Schema({
    name: String,
    group: {
        type: Schema.Types.ObjectId, ref: 'Group'
    }
});

const Team = mongoose.model<ITeam>('Team', TeamSchema);

export default Team;