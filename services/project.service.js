const Project = require("../models/project.model");
const Area = require("../models/area.model");
const Developer = require("../models/developer.model");
const fs = require("fs");
const path = require("path");

const getAllPublicProjects = async () => {
  return await Project.find()
    .populate("developer", "name")
    .populate("area", "name")
    .sort({ createdAt: -1 });
};

const getProjectByIdPublic = async (id) => {
  return await Project.findById(id)
    .populate("developer", "name")
    .populate("area", "name");
};

const filterProjects = async (filters) => {
  const query = {};

  // 🔹 Resolve Area Names → ObjectIds
  if (Array.isArray(filters.area) && filters.area.length > 0) {
    const areaDocs = await Area.find({
      name: { $in: filters.area.map((a) => new RegExp(`^${a.trim()}$`, "i")) },
    }).select("_id");
    if (areaDocs.length > 0) {
      query.area = { $in: areaDocs.map((a) => a._id) };
    }
  }

  // 🔹 Resolve Developer Names → ObjectIds
  if (Array.isArray(filters.developer) && filters.developer.length > 0) {
    const developerDocs = await Developer.find({
      name: { $in: filters.developer.map((d) => new RegExp(`^${d.trim()}$`, "i")) },
    }).select("_id");
    if (developerDocs.length > 0) {
      query.developer = { $in: developerDocs.map((d) => d._id) };
    }
  }


  // 🔹 Handover filter (array-based)
  if (filters.handover && filters.handover.length > 0) {
    query.handover = { $in: filters.handover.map((h) => new RegExp(h, "i")) };
  }

  // 🔹 Property Type filter (array-based)
  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    query.property_type = {
      $in: filters.propertyTypes.map((type) => new RegExp(type, "i")),
    };
  }


  // 🔹 Category filter (string)
  if (filters.category && filters.category.trim() !== "") {
    query.category = new RegExp(filters.category.trim(), "i");
  }

  // 🔹 Plan Status filter (only "Offplan" or "Onplan")
  if (filters.plan_status && filters.plan_status.length > 0) {
    const validStatuses = ["Offplan", "Onplan"];
    const selectedStatuses = filters.plan_status.filter((s) =>
      validStatuses.includes(s.trim())
    );
    if (selectedStatuses.length > 0) {
      query.plan_status = { $in: selectedStatuses };
    }
  }


  // 🔹 isBestArea filter (boolean)
  if (typeof filters.isBestArea === "boolean") {
    query.isBestArea = filters.isBestArea;
  }



  // 🔹 Price range
  const min = filters.priceMin ? Number(filters.priceMin) : 0;
  const max = filters.priceMax ? Number(filters.priceMax) : Number.MAX_SAFE_INTEGER;
  if (min > 0 || max < Number.MAX_SAFE_INTEGER) {
    query.price = { $gte: min, $lte: max };
  }

  // 🔹 Final query execution
  const projects = await Project.find(query)
    .populate("developer", "name")
    .populate("area", "name")
    .sort({ createdAt: -1 });

  return projects;
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
    developer,
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
    developer,
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
