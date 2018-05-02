const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

var app = express();

const UploadController = require('./app/routes/uploadController');

app.use(logger("short"));
app.use(express.static(path.resolve(__dirname, "public")));

app.use('/api/upload', UploadController);
app.use((err, req, res, next)=>{
    res.status(500).json({
        success: false,
        message: err.message
    });
});
mongoose.connect(process.env.DB);

var port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("server started at port " + port);
});