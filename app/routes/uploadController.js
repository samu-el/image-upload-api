const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Image= require('../models/Image');
var router = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    limits:{
        files: 1,
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, cb)=>{
        var ext = file.mimetype.split('/')[0];
        console.log(ext);
        if(ext != 'image') {
            cb(new Error("File is not an image"));
        }
        cb(null, true);
    }
});

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

router.post('/', upload.single('image'), (req, res, next)=>{
    var user = "user";
    Image.create({
        name: req.file.filename,
        original_name: req.file.originalname,
        file_size: req.file.size,
        owner: user,
        uploaded: new Date()
    }, (err, image)=>{
        if (err) return res.status(500).json({
            success: false,
            message: "error uploading image"
        });
        res.status(200).json({
            success: true,
            path: "/api/upload/"+image._id,
            image: image                         
        });
    });

});

router.get('/:id', (req, res)=>{
    var id = req.params.id;
    Image.findById(id, (err, result)=>{
        if (err) return res.status(500).json({
            success: false,
            message: "error retrieving image"
        });
        if (!result) return res.status(500).json({
            success: false,
            message: "error locating image"
        });
        res.sendFile(path.resolve(__dirname, "../../public/images/uploads/"+result.name));
    });
});

router.delete('/:id', (req, res)=>{
    var id = req.params.id;
    Image.findByIdAndRemove(id, (err, result)=>{
        if (err) return res.status(500).json({
            success: false,
            message: "error while retrieving image for deletion"
        });
        if (!result) return res.status(500).json({
            success: false,
            message: "error locating image"
        });
        fs.unlink("public/images/uploads/"+result.name, (err)=>{
            if (err) return res.status(500).json({
                success: false,
                message: "error deleting image"
            });
            res.status(200).json({
                success: true,
                message: result.name + " " + "deleted succesfully"
            });
        });
        
    });
});

module.exports = router;