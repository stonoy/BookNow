const express = require("express")
const userRouter = express.Router()
const {register, login, logout, setOwner} = require("../controllers/user")
const userAuth = require("../middlewares/authMiddleware")

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/logout", userAuth("user", "owner", "admin"), logout)
userRouter.patch("/setowner/:userid", userAuth("admin"), setOwner)

module.exports = userRouter