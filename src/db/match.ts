import * as mongoose from "mongoose";
import {Schema} from "mongoose";

export interface IFixture extends mongoose.Document {
    home_team: any;
    away_team: any;
    date: Date;
}

export const FixtureSchema = new mongoose.Schema({
    home_team: {
        type: Schema.Types.ObjectId, ref: 'Team'
    },
    away_team: {
        type: Schema.Types.ObjectId, ref: 'Team'
    },
    date: Date
}, {collection: 'matches'});

const Match = mongoose.model<IFixture>('Fixture', FixtureSchema);

export default Match;