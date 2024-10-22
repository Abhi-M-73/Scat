const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/db.connection');   // Database connection setup
const expressSession = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const ownerRouter = require('./routes/ownerRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const indexRouter = require('./routes/index');

const port = 3000;   // Server port
const app = express();

// Middleware configuration
app.use(express.json());    // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data (form submissions)
app.use(express.static(path.join(__dirname, "public")));  // Serve static files
app.use(cookieParser());    // Parse cookies

// This middleware is used to manage user sessions
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}));
app.use(flash());     //This middleware is used to display temporary messages (like success or error messages) to the user

app.set("view engine", "ejs");   // Set EJS as the view engine

// Route handling
app.use("/", indexRouter);
app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
