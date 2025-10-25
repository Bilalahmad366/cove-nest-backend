const Area = require("../models/area.model");
const slugify = require("slugify");
const Project = require("../models/project.model");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

const areaService = {
  // ✅ CREATE AREA
  async createArea(data, files) {
    const existing = await Area.findOne({ name: data.name });
    if (existing) throw new Error("Area with this name already exists.");

    // MAIN IMAGE
    let imageData = {};
    if (files.image?.[0]) {
      imageData = {
        url: files.image[0].path,
        public_id: files.image[0].filename,
      };
    }

    // SECTIONS
    let sections = [];
    try {
      sections = JSON.parse(data.sections || "[]");
    } catch (err) {
      throw new Error("Invalid sections format");
    }

    // MAP SECTION IMAGES
    if (files.section_images) {
      sections.forEach((section, i) => {
        if (files.section_images[i]) {
          section.image = {
            url: files.section_images[i].path,
            public_id: files.section_images[i].filename,
          };
        }
      });
    }

    // CREATE SLUG
    const slug = slugify(data.name, { lower: true, strict: true });

    const area = await Area.create({
      name: data.name,
      slug,
      about: data.about,
      mapIframe: data.mapIframe || "",
      is_featured: data.is_featured === "true",
      image: imageData,
      sections,
    });

    return area;
  },

  // ✅ UPDATE AREA
  async updateArea(id, data, files) {
    const area = await Area.findById(id);
    if (!area) throw new Error("Area not found.");

    // UPDATE MAIN IMAGE
    if (files.image?.[0]) {
      if (area.image?.public_id) {
        await cloudinary.uploader.destroy(area.image.public_id);
      }
      area.image = {
        url: files.image[0].path,
        public_id: files.image[0].filename,
      };
    }

    // UPDATE FIELDS
    if (data.name && data.name !== area.name) {
      area.name = data.name;
      area.slug = slugify(data.name, { lower: true, strict: true });
    }

    area.about = data.about || area.about;
    area.mapIframe = data.mapIframe || area.mapIframe;
    area.is_featured = data.is_featured ? data.is_featured === "true" : area.is_featured;

    // UPDATE SECTIONS
    let sections = [];
    try {
      sections = JSON.parse(data.sections || "[]");
    } catch (err) {
      throw new Error("Invalid sections format");
    }

    if (files.section_images) {
      sections.forEach((section, i) => {
        if (files.section_images[i]) {
          section.image = {
            url: files.section_images[i].path,
            public_id: files.section_images[i].filename,
          };
        }
      });
    }

    area.sections = sections;
    await area.save();
    return area;
  },

  // ✅ GET ALL AREAS
  async getAllAreas() {
    return Area.find().sort({ createdAt: -1 });
  },

  // ✅ GET SINGLE AREA BY ID
  async getAreaById(id) {
    const area = await Area.findById(id);
    if (!area) throw new Error("Area not found.");
    return area;
  },

  // ✅ GET SINGLE AREA BY SLUG
  async getAreaBySlug(slug) {
    const area = await Area.findOne({ slug });
    if (!area) throw new Error("Area not found.");
    return area;
  },

  // ✅ DELETE AREA
  async deleteArea(id) {
    const area = await Area.findById(id);
    if (!area) throw new Error("Area not found.");

    if (area.image?.public_id) {
      await cloudinary.uploader.destroy(area.image.public_id);
    }

    for (const sec of area.sections || []) {
      if (sec.image?.public_id) {
        await cloudinary.uploader.destroy(sec.image.public_id);
      }
    }

    await area.deleteOne();
    return { message: "Area deleted successfully." };
  },

  // ✅ GET PROJECTS BY AREA SLUG
  async getProjectsBySlug(slug) {
    const area = await Area.findOne({ slug });
    if (!area) throw new Error("Area not found.");

    const projects = await Project.find({ area: area._id })
      .populate("developer", "name about image")
      .populate("area", "name _id slug")
      .sort({ createdAt: -1 });

    return { area, projects };
  },
};

module.exports = areaService;
