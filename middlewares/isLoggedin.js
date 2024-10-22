const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports = async (req, res, next) => {
    // Check if the token exists in cookies
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");  // Make sure to use `res.redirect()`
    }

    try {
        // Verify the JWT token using the secret key
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // Find the user by email from the decoded token
        let user = await userModel.findOne({ email: decoded.email }).select("-password");

        // Attach the user to the request object for use in the next middleware or route
        req.user = user;
        
        // Proceed to the next middleware or route
        next();
    } catch (error) {
        // Handle errors and redirect
        console.error("JWT verification error:", error.message);
        req.flash("error", "Something went wrong. Please try again.");
        return res.redirect("/");  // Again, use `res.redirect()`
    }
};
