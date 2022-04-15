const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageData"
    },
    detailedImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageData"
    },
    indexGallery: Number,
    indexProject: Number
});

const Image =  mongoose.model("Image", ImageSchema)

module.exports = {
    Image,
    ImageSchema
}