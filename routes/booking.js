const express = require("express")
const userAuth = require("../middlewares/authMiddleware")
const bookingRouter = express.Router()
const {createBooking, getBooking, modifyBooking, deleteBooking} = require("../controllers/booking")

bookingRouter.get("/getmybookings", userAuth("user", "owner", "admin"), getBooking)
bookingRouter.post("/createbooking", userAuth("user", "owner", "admin"), createBooking)
bookingRouter.patch("/modifybooking/:bookingid", userAuth("user", "owner", "admin"), modifyBooking)
bookingRouter.delete("/deletebooking/:bookingid", userAuth("user", "owner", "admin"), deleteBooking)

module.exports = bookingRouter