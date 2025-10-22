const Developer = require("../models/developer.model");
const Area = require("../models/area.model");

const getDeveloperAndAreaDetails = async (req, res) => {
  try {
    const { developerId, areaId } = req.body;

    if (!developerId || !areaId) {
      return res.status(400).json({
        success: false,
        message: "developerId and areaId are required.",
      });
    }

    const developer = await Developer.findById(developerId);
    const area = await Area.findById(areaId);

    if (!developer && !area) {
      return res.status(404).json({
        success: false,
        message: "Developer and Area not found.",
      });
    }

    return res.status(200).json({
      success: true,
      developer,
      area,
    });
  } catch (error) {
    console.error("❌ Error fetching developer/area details:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = { getDeveloperAndAreaDetails };
