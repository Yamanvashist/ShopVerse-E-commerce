const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const verifyToken = (req, res, next) => { 
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Not authorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request
        next(); 
    } catch (err) {
        return res.status(403).json({ message: "Token is garbage" });
    }
};

module.exports = verifyToken;