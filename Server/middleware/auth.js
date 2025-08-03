const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // Extract token from cookies, body, or headers
    const token =
      req.cookies.token ||
      req.body.token ||
      (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

    // If token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded",decoded);
      req.user = decoded;
      next(); // Proceed to the next middleware/controller
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
