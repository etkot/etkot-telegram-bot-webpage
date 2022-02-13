"use strict";
exports.__esModule = true;
exports.quoteResolver = void 0;
exports.quoteResolver = {
    _id: function (parent, args, ctx, info) { return parent._id; },
    quote: function (parent, args, ctx, info) { return parent.quote; },
    name: function (parent, args, ctx, info) { return parent.name; }
};
