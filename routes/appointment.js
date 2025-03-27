const express = require("express")
const userAuth = require("../middlewares/authMiddleware")
const apptRouter = express.Router()
const {createAppointment, getAppointment, cancelAppointment, rescheduled, getMyAppointments} = require("../controllers/appointment")

apptRouter.post("/createappoint", userAuth("owner") ,createAppointment)
apptRouter.get("/getappointments", getAppointment)
apptRouter.get("/getmyappointments", userAuth("owner"), getMyAppointments)
apptRouter.patch("/cancel/:appointmentid", userAuth("owner") ,cancelAppointment)
apptRouter.patch("/reschedule/:appointmentid", userAuth("owner") , rescheduled)

module.exports = apptRouter

