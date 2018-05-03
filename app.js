const express = require('express');
const path = require('path');
const logger = require('morgan');

var app = express();

const UploadController = require('./app/routes/uploadController');

//log every request to console using morgan
app.use(logger("short"));

//use the public folder to serve static files
app.use(express.static(path.resolve(__dirname, "public")));

app.use('/api/upload', UploadController);

//if an error occurs send a status code 500 and return why the error occurred
app.use((err, req, res, next)=>{
    res.status(500).json({
        success: false,
        message: err.message
    });
});

module.exports = app;