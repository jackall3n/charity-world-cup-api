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
const donation_1 = require("../db/schemas/donation");
const user_1 = require("../db/schemas/user");
let DonationsController = class DonationsController {
    save(request, response) {
        let { donation_id } = request.body;
        if (!donation_id) {
            response.status(400).send({
                success: false
            });
            return;
        }
        user_1.default.findById(request.user.id).populate('donation').exec().then(user => {
            if (user.donation) {
                response.status(400).send({
                    success: false
                });
                return;
            }
            let donation = new donation_1.default({
                user: user._id,
                donation_id
            });
            donation.save().then(result => {
                user.donation = result._id;
                user.save().then(result => {
                    response.send({
                        donation,
                        success: true
                    });
                }).catch(() => {
                    response.status(400).send({
                        success: false
                    });
                });
            }).catch(() => {
                response.status(400).send({
                    success: false
                });
            });
        }).catch(error => {
            response.status(400).send({
                success: false
            });
        });
    }
};
__decorate([
    post_1.Post({ path: "/save", authorise: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DonationsController.prototype, "save", null);
DonationsController = __decorate([
    llama_1.Controller()
], DonationsController);
exports.DonationsController = DonationsController;
