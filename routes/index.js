const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product.model');

router.get("/", (req, res)=>{
    let error = req.flash("error");
    res.render("index", {error});
});

router.get("/shop", isLoggedin, async (req, res)=>{
    let product = await productModel.find();
    res.render("shop", {product});
});

router.get("/logout", isLoggedin, (req, res)=>{
    res.render("shop");
});

module.exports = router;