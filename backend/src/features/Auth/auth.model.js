"use strict";
exports.__esModule = true;
exports.AuthDBModel = void 0;
var mongoose = require("mongoose");
var authDBSchema = new mongoose.Schema({
    _id: Number,
    username: String,
    first_name: String,
    last_name: String,
    is_bot: Boolean
}, { collection: 'auth' });
exports.AuthDBModel = mongoose.model('Auth', authDBSchema);
