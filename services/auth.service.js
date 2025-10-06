const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Register - by default isVerified = false
exports.registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    isVerified: false, // 👈 default false (redundant but explicit)
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };
};

// Login - allow only verified users
exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Check verification status
  if (!user.isVerified) {
    throw new Error("Account not verified. Please verify your account first.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  };
};


exports.verifyUserByEmail = async (email) => {
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Check if already verified
  if (user.isVerified) {
    return { message: "Account already verified" };
  }

  // Verify user
  user.isVerified = true;
  await user.save();

  return { message: "Account verified successfully" };
};