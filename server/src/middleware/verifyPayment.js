const crypto = require("crypto")
const Order = require("../models/order")
const Cart = require("../models/cart")

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        // 1. create expected signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");

        // 2. compare signatures
        const isValid = expectedSignature === razorpay_signature;

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Payment not valid 🚨",
            });
        }

        // 3. update order in DB
        await Order.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                status: "paid",
                paymentId: razorpay_payment_id,
            }
        );

        await Cart.findOneAndUpdate(
            { user: req.user.id },
            { items: [] }
        );

        return res.json({
            success: true,
            message: "Payment verified",
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = verifyPayment