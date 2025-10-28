const mongoose = require("mongoose");
const slugify = require("slugify");
const Developer = require("./models/developer.model"); // adjust path if needed
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const developers = await Developer.find();
    for (const developer of developers) {
      if (!developer.slug) {
        // Using the developer name to generate slug
        developer.slug = slugify(developer.name, { lower: true, strict: true });
        await developer.save();
        console.log(`Slug added: ${developer.name} => ${developer.slug}`);
      }
    }
    console.log("All developer slugs updated!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
