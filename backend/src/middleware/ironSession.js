"use strict";
exports.__esModule = true;
exports.useSession = void 0;
var express_1 = require("iron-session/express");
var configure_1 = require("../configure");
var session = (0, express_1.ironSession)({
    cookieName: 'etkot_telegrambot_auth',
    password: configure_1["default"].SESSION_SECRET,
    cookieOptions: {
        secure: true,
        sameSite: 'none'
    }
});
var useSession = function (request, response, next) {
    session(request, response, next);
};
exports.useSession = useSession;
