const Cart = require("../models/cart");


const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1, size } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    if (!size) {
      return res.status(400).json({ message: "Size is required" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    let cart = await Cart.findOne({ user: userId });

    let exists = false

    // 🆕 if no cart → create
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, size }]
      });
    } else {
      exists = cart.items.some(
        item =>
          item.product.toString() === productId &&
          item.size === size
      );

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Product already in cart",
          exists: true
        });
      }

      cart.items.push({ product: productId, quantity, size });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Added to cart",
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
      .populate("items.product"); // 

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: []
        }
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
  const { productId, size } = req.params;

 

  try {
    let cart = await Cart.findOne({ user: userId });
     console.log(productId,size)
     console.log(cart)

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item =>
        item.product.toString() !== productId ||
        item.size !== size
    );

    await cart.save();

    await cart.populate("items.product");

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

module.exports = { addToCart, getCart, removeFromCart, updateCartItem }