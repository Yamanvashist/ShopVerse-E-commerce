const express = require("express")
const { Register, Login, Logout } = require("../controller/userController")
const verifyToken = require("../middleware/verifyToken")

const userRouter = express.Router()

userRouter.post("/register", Register)
userRouter.post("/login", Login)
userRouter.post("/logout", Logout)
userRouter.get("/checkAuth", verifyToken, (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (err) {
        res.status(500).json({ message: "Server can't digest" });
    }
});

module.exports = userRouter;