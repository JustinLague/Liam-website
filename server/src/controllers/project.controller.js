const Project = require("../models/project").Project;
const Image = require('../models/image').Image;
const mongoose = require('mongoose');

class ProjectController {
   
    async projects(req, res) {
        try {
            var projects = await Project.find().select("-__v").exec();

            var projects = await Promise.all(projects.map(async (project) => {
                var images = await Image.find({ projectId: project._id }).select("-__v -data").exec();
                
                return {
                    _id: project._id,
                    title : project.title,
                    description : project.description,
                    artDescription: project.artDescription,
                    status: project.status,
                    images: images
                };
            }));

            res.send(projects);
          } catch (err) {
              res.status(400).send({ error: err.message });
          }
    }

    async projectId(req, res) {
        try {
            var id = req.params.id;

            var project = await Project.findOne({ _id: id }).select("-__v").exec();

            var images = await Image.find({ projectId: project._id }).select("-__v -data").exec();

            res.send({
                project,
                images
            });
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }

    async updateProject(req, res) {
        try {
            var project = req.body.project;

            var updatedProject = project;
            
            if (project.status == "SAVED") {
                res.send(project._id);
                return;
            }

            if (project.status == "REMOVED") {
                await Project.findOneAndDelete({ _id: project._id }).exec();
                res.send(project._id);
                return;
            }

            //create new project
            if (project.status == "NEW") {
                updatedProject = new Project({ 
                    _id: new mongoose.mongo.ObjectId(),
                    title: project.title,
                    description: project.artDescription,
                    artDescription: project.description,
                    status: "SAVED"
                })
            }

            //project already exist
            if (project.status == "UPDATED") {
                updatedProject = await Project.findOne({ _id: project._id }).exec();
                updatedProject.title = project.title;
                updatedProject.description = project.artDescription;
                updatedProject.artDescription = project.description;
                updatedProject.status = "SAVED";
            } 

            await updatedProject.save();

            res.send(updatedProject._id);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }
}


module.exports = new ProjectController();