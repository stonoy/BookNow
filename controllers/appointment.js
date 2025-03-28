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
    const page = parseInt(req.query.page) || 1
    const limit = 2
    const skip = (page-1)*limit

    const appointments = await Appointment.find({}).populate("owner", "name").skip(skip).limit(limit)

    const totalApp = await Appointment.countDocuments({})
    const numOfPages = Math.ceil(totalApp/limit)

    res.status(200).json({appointments, numOfPages, page})
}

const getMyAppointments = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = 2
    const skip = (page-1)*limit

    const myAppointments = await Appointment.find({owner: req.user._id}).skip(skip).limit(limit)

    const totalApp = await Appointment.countDocuments({owner: req.user._id})
    const numOfPages = Math.ceil(totalApp/limit)

    res.status(200).json({myAppointments, numOfPages, page})
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

module.exports = {createAppointment, getAppointment, cancelAppointment, rescheduled, getMyAppointments}