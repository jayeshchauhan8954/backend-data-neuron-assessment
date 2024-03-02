// Calling Routes
const { masterRoutes } = require("./services/masters/Routes")


const ExpressApp = require("express")();
/**
 * 
 * @param {ExpressApp} app 
 */
module.exports = (app) => {
    /*  Routes */
    // master Routes for dataNeuron
    app.use("/v1/master", masterRoutes)
}