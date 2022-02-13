"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var apollo_datasource_mongodb_1 = require("apollo-datasource-mongodb");
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getCurrentUser = function () {
            if (!_this.context.session.user) {
                return null;
            }
            return _this.model.findById(_this.context.session.user._id).exec();
        };
        return _this;
    }
    return Auth;
}(apollo_datasource_mongodb_1.MongoDataSource));
exports["default"] = Auth;
