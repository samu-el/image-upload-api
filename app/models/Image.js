var mongoose = require("mongoose");

var ImageSchema = mongoose.Schema({
    name: String,
    owner: String,
    uploaded: Date
});

mongoose.model("Image", ImageSchema);

module.exports = mongoose.model("Image");