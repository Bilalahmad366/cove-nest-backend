// cleanupProjects.js
const mongoose = require("mongoose");
const Project = require("./models/project.model"); 

async function cleanupProjects() {
  try {
    await mongoose.connect("mongodb+srv://Developer:devop123@cluster0.jmpsrpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // 1️⃣ Get all valid fields from schema
    const schemaFields = Object.keys(Project.schema.paths);

    // 2️⃣ Find all projects
    const projects = await Project.find();

    console.log(`🔍 Found ${projects.length} projects`);

    // 3️⃣ Iterate over all documents
    for (const project of projects) {
      const docObj = project.toObject();
      const extraFields = Object.keys(docObj).filter(
        (key) => !schemaFields.includes(key) && key !== "_id" && key !== "__v"
      );

      if (extraFields.length > 0) {
        console.log(`🧹 Cleaning project ${project._id}:`, extraFields);

        // Remove unwanted fields
        extraFields.forEach((f) => delete project[f]);

        await project.save();
      }
    }

    console.log("✅ Cleanup completed successfully!");
  } catch (err) {
    console.error("❌ Error during cleanup:", err);
  } finally {
    mongoose.connection.close();
  }
}

cleanupProjects();
