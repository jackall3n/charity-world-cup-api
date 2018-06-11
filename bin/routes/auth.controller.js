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
const post_1 = require("../llama/post");
const user_1 = require("../db/schemas/user");
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
let AuthController = class AuthController {
    login(request, response) {
        let { email, password } = request.body;
        user_1.default.findOne({ email }, (error, user) => {
            user.comparePassword(password).then(matched => {
                if (matched) {
                    let token = jwt.sign(user, config_1.default.auth.secret);
                    response.send({
                        token
                    });
                }
            }).catch(error => {
                response.send(error);
            });
        });
    }
    register(request, response) {
        let { email, name, password } = request.body;
        let user = new user_1.default({
            email,
            name,
            password
        });
        user.save().then(user => {
            response.send(user);
        }).catch(error => {
            response.send(error);
        });
    }
};
__decorate([
    post_1.Post({ path: '/login' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    post_1.Post({ path: '/register' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    llama_1.Controller()
], AuthController);
exports.AuthController = AuthController;