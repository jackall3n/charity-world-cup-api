"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teams_controller_1 = require("./teams.controller");
let routes = [{
        path: "/teams",
        controller: teams_controller_1.TeamController
    }];
exports.default = routes;
