// Import Controllers
const AboutController = require("./controllers/about.controller");
const SectionController = require("./controllers/section.controller");
const GalleryController = require("./controllers/gallery.controller"); 
const ProjectController = require("./controllers/project.controller");
const ImageController = require("./controllers/image.controller");
const AuthController = require("./controllers/auth.controller");
const AuthPolicies = require('./middleware/policies/auth')
const upload = require("./middleware/upload");

module.exports = (app) => {
  //Authorisation
  //app.post("/api/register", AuthController.register);

  app.post("/api/login", AuthController.login);
  
  //Section
  app.get("/api/section", SectionController.section);
  app.post("/api/dashboard/sections", AuthPolicies.verifyToken, SectionController.updateSections)
  

  //Project
  app.get("/api/project", ProjectController.projects);
  app.get("/api/project/:id", ProjectController.projectId);
  app.post('/api/dashboard/project', AuthPolicies.verifyToken, ProjectController.updateProject);
  

  //Gallery
  app.get("/api/gallery", GalleryController.gallery);
  app.post("/api/dashboard/updateIndex", ImageController.updateGalleryIndex);
  app.post("/api/dashboard/deleteImage", ImageController.deleteImage);
  
  
  //Image
  app.get("/api/image/:id", ImageController.image);
  app.post("/api/dashboard/images", AuthPolicies.verifyToken, upload.array('image', 2), ImageController.addImages);

  //About
  app.get("/api/about", AboutController.about);
  app.post("/api/dashboard/about", AuthPolicies.verifyToken, upload.single('image'), AboutController.updateAbout)
};
