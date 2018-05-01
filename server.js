const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

var app = express();

app.use(logger("short"));
app.use(bodyParser.urlencoded({extended:true}));
app.use()