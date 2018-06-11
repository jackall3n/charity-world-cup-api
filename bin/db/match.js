"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.FixtureSchema = new mongoose.Schema({}, { collection: 'matches' });
const Match = mongoose.model('Fixture', exports.FixtureSchema);
exports.default = Match;
