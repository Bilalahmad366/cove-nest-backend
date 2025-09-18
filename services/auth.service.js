const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Register - force role to "Free"
exports.registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role, owner: user.owner || user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );


  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  };
};