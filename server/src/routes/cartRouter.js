const express = require("express");
const { addToCart, getCart, removeFromCart,updateCartItem } = require("../controller/cartController")
const verifyToken = require("../middleware/verifyToken")

const cartRouter = express.Router()

cartRouter.post("/add", verifyToken, addToCart);
cartRouter.get("/", verifyToken, getCart);
cartRouter.delete("/remove/:productId",verifyToken,removeFromCart)
cartRouter.put("/update",verifyToken,updateCartItem)

module.exports = cartRouter;