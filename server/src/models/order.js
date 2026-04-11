const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number,
            size: String,
        }
    ],
    totalAmount: {
        type: String,
        required: true
    },

    razorpayOrderId: String,
    paymentId: String,

    status: {
        type: String,
        enum: ["pending", "paid", "failed", "shipped", "delivered"],
        default: "pending"
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema);