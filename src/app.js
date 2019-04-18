const express = require("express");
const app = express();

const appConfig = require('./config/main-config.js');
const routeConfig = require('./config/route-config.js');

app.use("/styles",express.static(__dirname + "/styles"));

appConfig.init(app, express);
routeConfig.init(app);

module.exports = app;