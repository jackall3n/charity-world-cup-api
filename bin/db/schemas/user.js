"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        first: String,
        last: String
    }
});
exports.UserSchema.pre('save', next => {
    let user = this;
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10).then(salt => {
            bcrypt.hash(user.password, salt).then(hash => {
                user.password = hash;
                next();
            }).catch(error => {
                return next(error);
            });
        }).catch(error => {
            return next(error);
        });
    }
    else {
        next();
    }
});
exports.UserSchema.methods.comparePassword = (_password) => {
    return bcrypt.compare(_password, this.password);
};
const User = mongoose_1.model('User', exports.UserSchema);
exports.default = User;
