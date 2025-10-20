const Project = require("../models/project.model");
const fs = require("fs");
const path = require("path");

const getAllPublicProjects = async () => {
  return await Project.find().sort({ createdAt: -1 });
};

const getProjectByIdPublic = async (id) => {
  return await Project.findById(id);
};


const filterProjects = async (filters) => {
  const query = {};


  if (Array.isArray(filters.developer) && filters.developer.length > 0) {

    query.developer_name = {
      $in: filters.developer
        .filter(d => d && d.trim() !== "")
        .map(d => new RegExp(d.trim().replace(/\s+/g, '\\s*'), "i"))  // flexible spacing
    };
  }

  if (Array.isArray(filters.area) && filters.area.length > 0) {
    query.area = {
      $in: filters.area
        .filter(a => a && a.trim() !== "")
        // .map(a => new RegExp(`^${a.trim()}$`, "i"))
        .map(a => new RegExp(a.trim().replace(/\s+/g, '\\s*'), "i"))  // flexible spacing
    };
  }

  if (Array.isArray(filters.handover) && filters.handover.length > 0) {
    query.handover = {
      $in: filters.handover
        .filter(h => h && h.trim() !== "")
        // .map(h => new RegExp(`^${h.trim()}$`, "i"))
        .map(h => new RegExp(h.trim().replace(/\s+/g, '\\s*'), "i"))  // flexible spacing
    };
  }

  if (Array.isArray(filters.propertyTypes) && filters.propertyTypes.length > 0) {
    query.property_type = {
      $in: filters.propertyTypes
        .filter(p => p && p.trim() !== "")
        // .map(p => new RegExp(`^${p.trim()}$`, "i"))
        .map(p => new RegExp(p.trim().replace(/\s+/g, '\\s*'), "i"))  // flexible spacing
    };
  }

  const min = filters.priceMin && !isNaN(filters.priceMin) ? Number(filters.priceMin) : null;
  const max = filters.priceMax && !isNaN(filters.priceMax) ? Number(filters.priceMax) : null;

  if (min !== null || max !== null) {
    query.min_price = { $gte: min || 0 };
    query.max_price = { $lte: max || Number.MAX_SAFE_INTEGER };
  }

  if (filters.category && filters.category.trim() !== "") {
    query.category = new RegExp(`^${filters.category.trim()}$`, "i");
  }

  // ✅ Best Area (boolean)
  if (typeof filters.isBestArea === "boolean") {
    query.isBestArea = filters.isBestArea;
  }

  if (Array.isArray(filters.plan_status) && filters.plan_status.length > 0) {
    query.plan_status = {
      $in: filters.plan_status
        .filter(p => p && p.trim() !== "")
        // .map(p => new RegExp(`^${p.trim()}$`, "i"))
        .map(p => new RegExp(p.trim().replace(/\s+/g, '\\s*'), "i"))  // flexible spacing
    };
  }

  return await Project.find(query).sort({ createdAt: -1 });
};


const createProject = async (data) => {
  const { images, ...rest } = data;

  const project = new Project({
    ...rest,
    images: images || [],
  });

  return await project.save();
};


const updateProject = async (id, data, userId) => {
  const {
    about_points,
    about_overview,
    project_name,
    developer_name,
    location,
    city,
    area,
    size,
    property_type,
    min_price,
    max_price,
    plan_status,
    handover,
    bedrooms,
    images,
    newImages,
    category,
    description,
    isBestArea,
    amenities,
    payment_plans, // ✅ Add this
  } = data;

  const project = await Project.findOne({ _id: id, createdBy: userId });
  if (!project) return null;

  // 🧹 Remove old images
  const removedImages = project.images.filter((img) => !images.includes(img));
  removedImages.forEach((img) => {
    const filePath = path.join(__dirname, "..", img);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("❌ File delete error:", filePath, err.message);
      } else {
        console.log("✅ Deleted file:", filePath);
      }
    });
  });

  // 🧩 Update data
  const updateData = {
    project_name,
    about_points,
    about_overview,
    developer_name,
    location,
    city,
    area,
    property_type,
    min_price,
    max_price,
    plan_status,
    handover,
    bedrooms,
    size,
    category,
    description,
    amenities,
    payment_plans: payment_plans || project.payment_plans, // ✅ Fix added here
    isBestArea:
      typeof isBestArea === "boolean" ? isBestArea : project.isBestArea,
    images: [...(images || []), ...(newImages || [])],
  };

  // ✅ Use $set so nested fields overwrite properly
  return await Project.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};



const getAllProjects = async (userId) => {
  return await Project.find({ createdBy: userId }).sort({ createdAt: -1 });
};

const getProjectById = async (id, userId) => {
  return await Project.findOne({ _id: id, createdBy: userId });
};

const deleteProject = async (id, userId) => {
  const project = await Project.findOneAndDelete({ _id: id, createdBy: userId });

  if (!project) return null;

  if (project.images && project.images.length > 0) {
    project.images.forEach((img) => {
      const filePath = path.join(process.cwd(), img); // absolute path
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("❌ File delete error:", filePath, err.message);
        } else {
          console.log("✅ Deleted file:", filePath);
        }
      });
    });
  }

  return project;
};


module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getAllPublicProjects,
  filterProjects,
  getProjectByIdPublic,
};
