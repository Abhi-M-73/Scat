const express = require('express');
const upload = require('../config/multer-config');
const productModel = require('../models/product.model');

const router = express.Router();

router.get("/create", upload.single("image"), async (req, res) => {

    try {
        let { productName, price, discount, bgColor, panelColor, textColor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            productName,
            price,
            discount,
            bgColor,
            panelColor,
            textColor
        });

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;
