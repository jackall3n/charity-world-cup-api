"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teams_controller_1 = require("./teams.controller");
const fixtures_controller_1 = require("./fixtures.controller");
let routes = [{
        path: "/teams",
        controller: teams_controller_1.TeamController
    }, {
        path: "/fixtures",
        controller: fixtures_controller_1.FixturesController
    }];
exports.default = routes;
