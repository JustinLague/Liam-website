const mongoose = require('mongoose');
const Project = require("../models/project").Project;
const Section = require('../models/section').Section;

class SectionController {

    async section(req, res) {
        try {
            var sections = await Section.find().select("-__v").populate("metaProjects.project", ["title"]).exec();

            res.send(sections)
        } catch (err) {
            es.status(400).send({ error: err.message });
        }
    }
    
    async updateSections(req, res) {
        try {
            for (var section of req.body.sections) {

                var updatedSection;
                
                //if section didn't changed
                if (section.status == "SAVED") {
                    continue;
                }
                
                //delete section
                if (section.status == "REMOVED") {
                    await Section.findOneAndDelete({ _id: section._id }).exec();
                    continue;
                }

                //create new section
                if (section.status == "NEW") {
                    updatedSection = new Section({ 
                        _id: new mongoose.mongo.ObjectId(),
                        title: section.title,
                        status: "SAVED"
                    });
                }
                
                //section already exist
                if (section.status == "UPDATED") {
                    updatedSection = await Section.findOne({ _id: section._id }).populate("projects.project", ["_id"]).exec();
                    updatedSection.title = section.title;
                    updatedSection.metaProjects = [];
                    updatedSection.status = "SAVED";
                } 

                //add project to section
                for (var metaProject of section.metaProjects) {
                    var p = await Project.findOne({ _id: metaProject.projectId }).select("_id").exec();
                    var newMetaProject = {
                        _id: new mongoose.mongo.ObjectId(),
                        projectId: p,
                        index: metaProject.index,
                    }

                    updatedSection.metaProjects.push(newMetaProject);
                }

                await updatedSection.save();
            }

            var sections = await Section.find().select("-__v").exec();

            res.send(sections)
        } catch (err) {
            res.status(400).send({ error: err.message });
        }  
    }
}

module.exports = new SectionController();