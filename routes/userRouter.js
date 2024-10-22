const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/authControllers');

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.get("/", (req, res) => {
    res.send("User route is working");
});

module.exports = router;
