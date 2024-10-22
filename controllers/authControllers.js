const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');


module.exports.registerUser = async (req, res) => {
    try {
        // Destructure request body
        const { fullName, email, password } = req.body;

        // Check if a user with the given email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "You already have an account , please login" });
        }

        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with hashed password
        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword, // Store the hashed password
        });


        let token = generateToken(user);
        // Send the token in response
        res.cookie("token", token);
        res.status(201).json({ token, message: "User registered successfully" });
        // console.log(token); // Logging the token for testing purposes

    } catch (error) {
        // Send error message
        res.status(500).send({ message: error.message });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Find user by email
        let user = await userModel.findOne({ email: email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare the password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Generate token
            let token = generateToken(user);

            // Set token as a cookie (add options for security if needed)
            res.cookie("token", token); // Set secure cookie option as needed

            // Send success response
            return res.status(200).json({ message: "Login successful", token: token });
        } else {
            return res.status(400).json({ message: "Invalid email or password." });
        }
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ message: "An error occurred during login." });
    }
};
