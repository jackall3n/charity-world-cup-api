import * as mongoose from "mongoose";

export interface IFixture extends mongoose.Document {

}

export const FixtureSchema = new mongoose.Schema({

}, {collection: 'matches'});

const Match = mongoose.model<IFixture>('Fixture', FixtureSchema);

export default Match;