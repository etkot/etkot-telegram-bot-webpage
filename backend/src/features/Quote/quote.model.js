"use strict";
exports.__esModule = true;
exports.QuoteDBModel = void 0;
var mongoose = require("mongoose");
var quoteDBSchema = new mongoose.Schema({
    quote: String,
    name: String
});
exports.QuoteDBModel = mongoose.model('Quote', quoteDBSchema);
