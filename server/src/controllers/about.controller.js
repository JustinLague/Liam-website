const About = require('../models/about').About;
const ImageData = require('../models/imageData').ImageData;
const fs = require('fs');

class AboutController {

    async about(req, res) {
        try {
            var about = await About.findOne().select("-__v -data -contentType").exec();

            res.send(about);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }

    async updateAbout(req, res) {
        try {
            let about = await About.findOne().select("-__v -data -contentType").exec();
            
            let aboutImage;

            if(!about) {
                about = new About();
            }
            
            if (about.image) 
                aboutImage = await ImageData.findOne({ _id: about.image }).select("-__v").exec();

            if (!aboutImage)
                aboutImage = new ImageData();

            about.description = [req.body.descriptionFR, req.body.descriptionEN];

            if (req.file) {
                aboutImage.contentType = req.file.mimetype;
                aboutImage.data = new Buffer.from(fs.readFileSync(req.file.path), 'base64');
                
                aboutImage.save();
                
                about.image = aboutImage;
            }

            about.save();

            res.status(200).send({
                description: about.description,
                image: about.image._id
            });

        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }
}

module.exports = new AboutController();