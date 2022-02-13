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
var Quotes = /** @class */ (function (_super) {
    __extends(Quotes, _super);
    function Quotes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getAllQuotes = function () {
            if (!_this.context.session.user) {
                return null;
            }
            return _this.model.find({}).exec();
        };
        return _this;
    }
    return Quotes;
}(apollo_datasource_mongodb_1.MongoDataSource));
exports["default"] = Quotes;
