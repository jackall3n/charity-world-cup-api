"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: {
        address: process.env.DB_STRING
    },
    auth: {
        secret: process.env.JWT_SECRET
    }
};
