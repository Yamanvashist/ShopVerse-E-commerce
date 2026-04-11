const express = require("express")
const { getProduct, getProductById, addProduct, productByCategory } = require("../controller/productController");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/multer")

const productRouter = express.Router();

productRouter.get("/", getProduct) //Get all Products
productRouter.get("/:id", getProductById) //Get specific Product by id
productRouter.post("/", verifyToken, isAdmin, upload.single("image"), addProduct) // add product
productRouter.get("/category/:category", productByCategory)

module.exports = productRouter;

