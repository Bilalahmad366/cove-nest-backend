const Developer = require("../models/developer.model");
const Project = require("../models/project.model")
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");
const developerService = {
  async createDeveloper(data, file) {
    const existing = await Developer.findOne({ name: data.name });
    if (existing) throw new Error("Developer with this name already exists.");

    let imageData = {};
    if (file) {
      imageData = {
        url: file.path, // CloudinaryStorage se direct URL milta hai
        public_id: file.filename, // public_id Cloudinary se milta hai
      };
    }

    const developer = await Developer.create({
      name: data.name,
      about: data.about,
      image: imageData,
       mapIframe: data.mapIframe || "",
      is_featured: data.is_featured === "true",
    });
    return developer;
  },

  async getAllDevelopers() {
    return Developer.find().sort({ createdAt: -1 });
  },

  async getDeveloperById(id) {
    const developer = await Developer.findById(id);
    if (!developer) throw new Error("Developer not found.");
    return developer;
  },

  async updateDeveloper(id, data, file) {
    const developer = await Developer.findById(id);
    if (!developer) throw new Error("Developer not found.");

    // Agar naya image upload hua ho to purana Cloudinary image delete karein
    if (file) {
      if (developer.image?.public_id) {
        await cloudinary.uploader.destroy(developer.image.public_id);
      }
      developer.image = {
        url: file.path,
        public_id: file.filename,
      };
    }

    developer.name = data.name || developer.name;
    developer.about = data.about || developer.about;
    developer.mapIframe = data.mapIframe || developer.mapIframe;
    developer.is_featured = data.is_featured ==="true";

    await developer.save();
    return developer;
  },

  async deleteDeveloper(id) {
    const developer = await Developer.findById(id);
    if (!developer) throw new Error("Developer not found.");

    if (developer.image?.public_id) {
      await cloudinary.uploader.destroy(developer.image.public_id);
    }

    await developer.deleteOne();
    return { message: "Developer deleted successfully." };
  },

// ✅ GET PROJECTS BY DEVELOPER
async getProjectsByDeveloper(developerId) {
  const developer = await Developer.findById(developerId);
  if (!developer) throw new Error("Developer not found");

  const projects = await Project.find({ developer: developerId })
    .populate("developer", "name about image")
    .populate("area", "name _id image" )
    .sort({ createdAt: -1 });

  return { developer, projects };
}



};

module.exports = developerService;
