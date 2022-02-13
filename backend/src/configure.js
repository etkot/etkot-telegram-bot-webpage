"use strict";
exports.__esModule = true;
var variables = {
    NODE_ENV: "Mode: 'production', 'test' or 'development'",
    PORT: 'Port to listen on',
    SESSION_SECRET: 'Session Secret',
    TELEGRAM_SECRET: 'Telegram Secret',
    DB_HOST: "Hostname of the mongo database, e.g. 'localhost'",
    DB_NAME: "Name of the database, e.g. 'titeweb'",
    DB_PORT: 'Port of the database, e.g. 27017'
};
var configuration = {};
Object.keys(variables).forEach(function (variable) {
    var envVariable = process.env[variable];
    if (!envVariable && !process.env.SKIP_VARIABLE_CHECK) {
        console.error("Missing configuration variable: ".concat(variable, " (").concat(variables[variable], ")"));
    }
    else {
        configuration[variable] = envVariable;
    }
});
exports["default"] = configuration;
