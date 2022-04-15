const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    title: [String],
    status: String,
    metaProjects: [{
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
        index: Number
    }]
});

const Section = mongoose.model("Section", SectionSchema)

module.exports = {
    Section,
    SectionSchema
}