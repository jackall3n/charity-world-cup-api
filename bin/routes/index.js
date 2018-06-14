"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teams_controller_1 = require("./teams.controller");
const matches_controller_1 = require("./matches.controller");
const groups_controller_1 = require("./groups.controller");
const auth_controller_1 = require("./auth.controller");
const me_controller_1 = require("./me.controller");
const donations_controller_1 = require("./donations.controller");
const admin_controller_1 = require("./admin.controller");
const email_controller_1 = require("./email.controller");
let routes = [{
        path: "/me",
        controller: me_controller_1.MeController
    }, {
        path: "/auth",
        controller: auth_controller_1.AuthController
    }, {
        path: "/teams",
        controller: teams_controller_1.TeamController
    }, {
        path: "/matches",
        controller: matches_controller_1.MatchesController
    }, {
        path: "/groups",
        controller: groups_controller_1.GroupsController
    }, {
        path: "/donations",
        controller: donations_controller_1.DonationsController
    }, {
        path: "/jack",
        controller: admin_controller_1.AdminController
    }, {
        path: "/email",
        controller: email_controller_1.EmailController
    }];
exports.default = routes;
