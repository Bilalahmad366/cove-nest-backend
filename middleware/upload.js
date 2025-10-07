// const multer = require("multer");
// const path = require("path");

// // Storage location
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/projects/"); // folder jahan images save hongi
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// // File filter (only images)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowedTypes.test(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only .jpeg, .jpg and .png files are allowed!"), false);
//   }
// };

// // Multer instance
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
//   fileFilter: fileFilter,
// });

// module.exports = upload;


// Cloudinary version (commented)

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage config
// allowed_formats: ["jpg", "jpeg", "png"],
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "projects_uploads", // Cloudinary folder name
    resource_type: "auto", 
  },
});

// Multer instance (Cloudinary par upload karega)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

module.exports = upload;