const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate('assignedRole');

    if (!user) return res.status(401).json({ message: "User not found" });

   

    rq.user = {
      id: user._id,
      name: user.name,
      email: user.email,
   
    };

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
