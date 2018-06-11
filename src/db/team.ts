import * as mongoose from "mongoose";

export interface ITeam extends mongoose.Document {

}

export const TeamSchema = new mongoose.Schema({

});

const Team = mongoose.model<ITeam>('Team', TeamSchema);

export default Team;