const express = require('express');                // Import the Express framework to create the server
const path = require('path');                      // Import the path module to handle and transform file paths
const cookieParser = require('cookie-parser');     // Import cookie-parser middleware to parse cookies in the HTTP request
const db = require('./config/db.connection');      // Import the database connection configuration (e.g., MongoDB, MySQL)
const ownerRouter = require('./routes/ownerRouter');   // Import routes for owner-related operations
const userRouter = require('./routes/userRouter');     // Import routes for user-related operations
const productRouter = require('./routes/productRouter'); // Import routes for product-related operations
require('dotenv').config();

const port = 3000;                                 // Set the port number for the server to listen on
const app = express();                             // Create an Express application instance

// Middleware configuration
app.use(express.json());                           // Parse incoming JSON requests and populate req.body
app.use(express.urlencoded({ extended: true }));   // Parse URL-encoded data (e.g., form submissions) and populate req.body
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (like HTML, CSS, JS) from the "public" directory
app.use(cookieParser());                           // Parse cookies attached to client requests

app.set("view engine", "ejs");                     // Set EJS as the templating engine for rendering dynamic HTML

// Route handling middleware
app.use("/owners", ownerRouter);                   // Mount the ownerRouter to handle requests to "/owners"
app.use("/users", userRouter);                     // Mount the userRouter to handle requests to "/users"
app.use("/products", productRouter);               // Mount the productRouter to handle requests to "/products"

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`); // Log a message when the server is running
});
