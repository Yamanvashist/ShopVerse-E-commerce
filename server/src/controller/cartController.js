const Cart = require("../models/cart");


const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // from JWT
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID required" });
        }

        // find cart of user
        let cart = await Cart.findOne({ user: userId });

        // if cart doesn't exist → create one
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity: quantity || 1 }]
            });
        } else {
            // check if product already exists in cart
            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // product exists → increase quantity
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                // new product → push
                cart.items.push({
                    product: productId,
                    quantity: quantity || 1
                });
            }
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product"); // 🔥 MAGIC

    if (!cart) {
      return res.status(200).json({
        success: true,
        items: []
      });
    }

    res.status(200).json({
      success: true,
      cart
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove item
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ success: false, message: "Error removing item" });
  }
};

const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // 🔥 If quantity is 0 → remove item
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ success: false, message: "Error updating cart" });
  }
};

module.exports = {addToCart,getCart,removeFromCart,updateCartItem}