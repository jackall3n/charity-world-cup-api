"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("express");
const llama_1 = require("../llama");
const get_1 = require("../llama/get");
const match_1 = require("../db/match");
const post_1 = require("../llama/post");
const team_1 = require("../db/team");
const moment = require("moment");
let MatchesController = class MatchesController {
    getAll(request, response) {
        match_1.default.find({}, (error, matches) => {
            if (error) {
                response.send(error);
                return;
            }
            response.send(matches);
        });
    }
    add(request, response) {
        let { home, away, date, time } = request.body;
        Promise.all([
            team_1.default.find({ name: home }),
            team_1.default.find({ name: away })
        ]).then((teams) => {
            let match = new match_1.default();
            let home_team = teams[0];
            let away_team = teams[1];
            match.home_team = home_team._id;
            match.away_team = away_team._id;
            match.date = moment(`${date}/2018 ${time}:00`, 'DD/MM/YYYY HH:mm').toDate();
            match.save().then(match => {
                response.send(match);
            });
        });
    }
};
__decorate([
    get_1.Get({ path: "/" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "getAll", null);
__decorate([
    post_1.Post({ path: "/add" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MatchesController.prototype, "add", null);
MatchesController = __decorate([
    llama_1.Controller()
], MatchesController);
exports.MatchesController = MatchesController;
