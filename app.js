// import modules
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const http = require('http');
const compression = require('compression');
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')

// Path Alias
require('module-alias/register')

// configs
const { PORT, rootDir } = require("./config/index");
const { handleCatchError, handleRouteNotFound, handleCors, handleRateLimit } = require("@src/middlewares/express_app");
const { serviceResponse } = require("@src/utils/helpers/api_response");
const { sendMail } = require("@src/utils/helpers/node_mailer");

// application level middlewares
app.use(helmet())
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(compression());
app.use(handleCors)
app.use(handleRateLimit)
app.disable('x-powered-by')

// main DB Connection
const db = require("./config/db")


// server status
app.get('/', (req, res) => {
    res.send(`<div align="center" style=""><h1>DataNeuron Server is Ready For Requests. <h1><div>`);
});

// Routes permissions
require("./src/routes.js")(app)

/* Handle errors */
app.use(handleCatchError)
app.all("*", handleRouteNotFound)

// Create http server
const httpServer = http.createServer(app);

// Listner server
httpServer.listen(PORT, async () => {
    console.log("DataNeuron Server is running on PORT:", PORT);
})  