const Product = require("../models/product")
const cloudinary = require("../config/cloudinary");

const getProduct = async (req, res) => {
    try {
        const products = await Product.find().lean();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No Products Added Yet" });
        }

        return res.status(200).json({
            success: true,
            products,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            product,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};

const addProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    try {
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: "Incomplete information" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        console.log(req.file);

        const result = await cloudinary.uploader.upload(req.file.path);

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            image: result.secure_url,
        });

        await product.save();

        res.status(201).json({ success: true, product });

    } catch (err) {
         console.log("ERROR:", err);
        res.status(500).json({ success: false, message: "Error adding Product" });
    }
};

module.exports = { getProduct, getProductById, addProduct }