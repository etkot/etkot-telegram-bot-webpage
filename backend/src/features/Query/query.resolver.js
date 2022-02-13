"use strict";
exports.__esModule = true;
exports.queryResolver = void 0;
exports.queryResolver = {
    getAllQuotes: function (parent, args, _a, info) {
        var dataSources = _a.dataSources;
        return dataSources.quotes.getAllQuotes();
    },
    whoami: function (parent, args, _a, info) {
        var dataSources = _a.dataSources;
        return dataSources.auth.getCurrentUser();
    }
};
