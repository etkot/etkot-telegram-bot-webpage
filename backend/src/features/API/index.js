"use strict";
exports.__esModule = true;
exports.ApiRouter = void 0;
var express_1 = require("express");
var Login_1 = require("./Login");
exports.ApiRouter = (0, express_1.Router)();
exports.ApiRouter.use('/api', Login_1.LoginRouter);
