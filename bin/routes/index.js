"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teams_controller_1 = require("./teams.controller");
const matches_controller_1 = require("./matches.controller");
const groups_controller_1 = require("./groups.controller");
let routes = [{
        path: "/teams",
        controller: teams_controller_1.TeamController
    }, {
        path: "/matches",
        controller: matches_controller_1.MatchesController
    }, {
        path: "/groups",
        controller: groups_controller_1.GroupsController
    }];
exports.default = routes;
