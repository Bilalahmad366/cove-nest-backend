const authService = require('../services/auth.service');

exports.register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    next(err); 
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


exports.verifyByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const result = await authService.verifyUserByEmail(email);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};