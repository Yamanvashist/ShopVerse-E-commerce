const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const Register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Fill all required fields",
            });
        }

        const alreadyexist = await User.findOne({ email });

        if (alreadyexist) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id, email: user.email, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })


        return res.status(201).json({
            message: "User Created",
            success: true,
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
            },
            success: true
        }
        );

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Server Error",
            error: err.message,
            success: false,
        });
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role, username: user.username,role : user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
            },
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Server Error",
            error: err.message,
        });
    }
};

const Logout = (req, res) => {
    try {
        res.clearCookie("token", {
        })
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
}


module.exports = { Register, Login, Logout };