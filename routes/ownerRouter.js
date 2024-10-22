const express = require('express');
const ownerModel = require('../models/owner.model.js');
const bcrypt = require('bcrypt');
const router = express.Router();

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            // Check if any owner already exists
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(403).send({
                    message: "You don't have permission to create a new owner. An owner already exists."
                });
            }

            // Destructure request body
            let { fullName, email, password } = req.body;

            // Hash the password before saving
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create new owner with hashed password
            let createdOwner = await ownerModel.create({
                fullName,
                email,
                password: hashedPassword  // Store the hashed password
            });

            // Send success response
            res.status(201).send({
                message: "Owner created successfully",
                owner: createdOwner
            });
        } catch (error) {
            // Log error to console and send response
            console.error(error);
            res.status(500).send({
                message: "An error occurred while creating the owner.",
                error: error.message
            });
        }
    });
}

router.get("/", (req, res) => {
    res.send("Owners route is working");
});

module.exports = router;
