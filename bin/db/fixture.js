"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.FixtureSchema = new mongoose.Schema({});
const Fixture = mongoose.model('Fixture', exports.FixtureSchema);
exports.default = Fixture;
