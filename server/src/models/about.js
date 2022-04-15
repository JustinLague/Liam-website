const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    description: [String],
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageData"
    },
});

const About =  mongoose.model("About", AboutSchema)

module.exports = {
    About,
    AboutSchema
}