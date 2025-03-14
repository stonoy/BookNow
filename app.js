const express = require('express')
require("express-async-errors")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")

const connectDB = require("./config")
const userRouter = require("./routes/user")
const errorMiddleware = require("./middlewares/errorMiddleware")
const apptRouter = require('./routes/appointment')
const userAuth = require('./middlewares/authMiddleware')
const bookingRouter = require('./routes/booking')

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/appointment",apptRouter)
app.use("/api/v1/booking", bookingRouter)


app.use("*", (req, res) => {
    res.status(404).json({msg: "no such route found"})
})

app.use(errorMiddleware)

const port = process.env.PORT || 80

connectDB(process.env.DB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`server is listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(`error in connecting to server -> ${err}`)
    })
