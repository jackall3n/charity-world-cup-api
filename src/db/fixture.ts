import * as mongoose from "mongoose";

export interface IFixture extends mongoose.Document {

}

export const FixtureSchema = new mongoose.Schema({

});

const Fixture = mongoose.model<IFixture>('Fixture', FixtureSchema);

export default Fixture;