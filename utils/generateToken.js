const jwt = require('jsonwebtoken');

const generateToken = (createdUser) => {
    // Generate JWT token using the created user's ID and email
    return jwt.sign(
        { email: createdUser.email, id: createdUser._id }, // Use createdUser to access email
        process.env.JWT_KEY, // Ensure JWT_KEY is set in your environment variables
        { expiresIn: '1h' } // Token expiry time
    );
};

module.exports = generateToken;
