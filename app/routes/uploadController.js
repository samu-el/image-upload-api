const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const Image= require('../models/Image');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res)=>{
    Image.find((err, result)=>{
        if (err) return res.status(500).json({
            success: false,
            message: "error retrieving images"
        });
        res.status(200).json({
            success: true,
            images: result
        });
    });
});

router.post('/', (req, res)=>{
    //todo: accept the file from the reqest
    //todo: save file to public/images


    Image.create({
        name: "name",
        owner: "",
        uploaded: new Date()
    }, (err, image)=>{
        if (err) return res.status(500).json({
            success: false,
            message: "error uploading image"
        });
        res.status(200).json({
            success: true,
            image: image
        });
    });

});

router.get('/:id', (req, res)=>{
    var id = req.params[0];
    Image.findOne({id: id}, (err, result)=>{
        if (err) return res.status(500).json({
            success: false,
            message: "error retrieving images"
        });
        res.status(200).json({
            success: true,
            images: result
        });
    });
});

router.put('/:id', (req, res)=>{
    var id = req.params.id;
    Image.findByIdAndUpdate(id, {
        name: "new name",
        owner: "new owner",
        uploaded: new Date()
    },{ new: true}, (err, result)=>{
        if (err) return res.status(500).json({
            success: false,
            message: "error retrieving images"
        });
        res.status(200).json({
            success: true,
            images: result
        });
    });
});
module.exports = router;

