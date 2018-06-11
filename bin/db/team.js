"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.TeamSchema = new mongoose.Schema({});
const Team = mongoose.model('Team', exports.TeamSchema);
exports.default = Team;
