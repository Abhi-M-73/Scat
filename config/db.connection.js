const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')("developement:mongoose");

const mongodbURI = config.get("MONGODB_URI") || "mongodb://localhost:27017/scatch";
// console.log("NODE_ENV:", process.env.NODE_ENV);



mongoose.connect(`${mongodbURI}/scatch`)
    .then(() => {
        debug("Database Connected");
    })
    .catch((error) => {
        debug(error);
    });

module.exports = mongoose.connection;
