"use strict";
exports.__esModule = true;
exports.authResolver = void 0;
exports.authResolver = {
    _id: function (parent, args, ctx, info) { return parent._id; },
    username: function (parent, args, ctx, info) { return parent.username; },
    first_name: function (parent, args, ctx, info) { return parent.first_name; },
    last_name: function (parent, args, ctx, info) { return parent.last_name; },
    is_bot: function (parent, args, ctx, info) { return parent.is_bot; }
};
