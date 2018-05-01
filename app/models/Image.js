var mongoose = require("mongoose");

var ImageSchema = mongoose.Schema({
    name: String,
    original_name: String,
    file_size: Number,
    owner: String,
    uploaded: Date
});

mongoose.model("Image", ImageSchema);

module.exports = mongoose.model("Image");