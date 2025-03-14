const Appointment = require("../models/appointment")
const { sanitizeTimings, sanitizeSlotUsers, sanitizeNames } = require("../sanitize/appointment")


const createAppointment = async (req, res) => {
    const {timing, slots, name} = sanitizeTimings(req.body)

    sanitizeSlotUsers(req.body)

    sanitizeNames(req.body)

    const newAppointment = new Appointment({
        name,
        timing,
        slots,
        owner: req.user._id
    })

    await newAppointment.save()

    res.status(201).json({msg: "appointment created"})
}

const getAppointment = async (req, res) => {
    const appointments = await Appointment.find({})

    res.status(200).json({appointments})
}

const cancelAppointment = async (req, res) => {
    const {appointmentid} = req.params

    await Appointment.findOneAndUpdate({_id: appointmentid, owner: req.user._id}, {status: "cancelled"})

    res.status(200).json({msg: "appointment status cancelled"})
}

const rescheduled = async (req, res) => {
    const {appointmentid} = req.params
    const {timing, slots, name} = sanitizeTimings(req.body)

    sanitizeSlotUsers(req.body)

    sanitizeNames(req.body)

    await Appointment.findByIdAndUpdate({_id: appointmentid, owner: req.user._id}, {timing, slots, name, status: "rescheduled"})

    res.status(200).json({msg: "appointment rescheduled"})
}

module.exports = {createAppointment, getAppointment, cancelAppointment, rescheduled}