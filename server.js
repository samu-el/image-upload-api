const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

var app = express();

const UploadController = require('./app/routes/uploadController');

app.use(logger("short"));
app.use(express.static(path.resolve(__dirname, "public")));

app.use('/api/upload', UploadController);

mongoose.connect('mongodb://localhost:27017/imagedb');

app.listen(3000, ()=>{
    console.log("server started");
});