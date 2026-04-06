const express = require("express")
const dotenv = require("dotenv")
const connection = require("./src/config/usermongo")
const userRouter = require("./src/routes/userRouter")
const productRouter = require("./src/routes/productRouter")
const cartRouter = require("./src/routes/cartRouter")
const cookieParser = require('cookie-parser');
const cors = require("cors")

dotenv.config()

const app = express()

connection();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/product", productRouter)
app.use("/cart",cartRouter)

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => console.log("Server started on ", port))