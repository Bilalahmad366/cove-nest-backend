const mongoose = require("mongoose");
const slugify = require("slugify");
const Project = require("./models/project.model");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const projects = await Project.find();
    for (const project of projects) {
      if (!project.slug) {
        project.slug = slugify(project.project_name, { lower: true, strict: true });
        await project.save();
        console.log(`Slug added: ${project.project_name} => ${project.slug}`);
      }
    }
    console.log("All slugs updated!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
