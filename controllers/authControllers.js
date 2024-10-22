const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken  = require('../utils/generateToken');


module.exports.registerUser = async (req, res)=>{
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
        const createdUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword, // Store the hashed password
        });


        let token = generateToken(createdUser);
        // Send the token in response
        res.cookie("token", token);
        res.status(201).json({ token, message: "User registered successfully" });
        // console.log(token); // Logging the token for testing purposes

    } catch (error) {
        // Send error message
        res.status(500).send({ message: error.message });
    }
};