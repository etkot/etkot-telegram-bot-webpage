"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LoginRouter = void 0;
var crypto = require("crypto");
var express_1 = require("express");
var configure_1 = require("../../../configure");
var auth_model_1 = require("../../../features/Auth/auth.model");
exports.LoginRouter = (0, express_1.Router)();
exports.LoginRouter.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, keys, authData, _i, keys_1, key, secret, hash, time, timeLimit, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.session.user);
                data = req.body;
                keys = Object.keys(data);
                keys.sort();
                authData = [];
                for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    key = keys_1[_i];
                    if (key === 'hash')
                        continue;
                    authData.push("".concat(key, "=").concat(data[key]));
                }
                secret = crypto.createHash('sha256').update(configure_1["default"].TELEGRAM_SECRET).digest();
                hash = crypto.createHmac('sha256', secret).update(authData.join('\n')).digest('hex');
                if (hash !== data.hash) {
                    res.status(401).json({ error: 'Invalid hash' });
                    return [2 /*return*/];
                }
                time = Math.round(Date.now() / 1000) // 1 hour
                ;
                timeLimit = 86400 // 24 hours
                ;
                if (time - data.auth_date > timeLimit) {
                    res.status(401).json({ error: 'Auth date is too old' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, auth_model_1.AuthDBModel.findById(data.id).exec()];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(401).json({ error: 'User not found' });
                    return [2 /*return*/];
                }
                req.session.user = user;
                return [4 /*yield*/, req.session.save()];
            case 2:
                _a.sent();
                res.json({ success: true });
                return [2 /*return*/];
        }
    });
}); });
