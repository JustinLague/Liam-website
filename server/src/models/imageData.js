const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageDataSchema = new Schema({
    data: { type: Buffer },
    contentType: { type: String },
});

const ImageData =  mongoose.model("ImageData", ImageDataSchema)

module.exports = {
    ImageData,
    ImageDataSchema
}