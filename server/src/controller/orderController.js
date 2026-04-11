const Cart = require("../models/cart")
const Order = require("../models/order")
const razorpay = require("../config/razorpay")

const createOrder = async (req, res) => {

    const userid = req.user.id;

    try {

        const cart = await Cart.findOne({ user: userid }).populate("items.product");

        if (!cart || !cart.items.length)
            return res.status(404).json({ message: "No items added yet.." });

        const totalAmount = cart.items.reduce((sum, item) => {
            return sum + (item.product.price || 0) * (item.quantity || 0);
        }, 0);

        const razorpayOrder = await razorpay.orders.create({
            amount: (totalAmount + 40) * 100, // paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        });

        const order = await Order.create({
            user: userid,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                size: item.size
            })),
            totalAmount: Number(totalAmount),
            razorpayOrderId: razorpayOrder.id,
            status: "pending"
        });

        return res.status(200).json({
            success: true,
            order,
            razorpayOrder
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = createOrder