const Image = require('../models/image').Image;

class GalleryController {
    
  async gallery(req, res) {
    try {
        var images = await Image.find({ projectId: { $ne: null } }).select("-__v -data -contentType").exec();

        res.send(images)
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}

module.exports = new GalleryController();