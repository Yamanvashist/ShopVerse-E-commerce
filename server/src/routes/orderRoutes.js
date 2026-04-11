const express = require("express");
const router = express.Router();
const createOrder = require("../controller/orderController")
const verifyToken = require("../middleware/verifyToken")
const verifyPayment = require("../middleware/verifyPayment")

router.post("/create", verifyToken, createOrder);
router.post("/verify", verifyPayment);

module.exports = router;