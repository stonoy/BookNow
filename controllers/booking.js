const createError = require("../errorClass")
const Appointment = require("../models/appointment")
const Booking = require("../models/booking")

const createBooking = async(req, res) => {
    const {appointment, slot} = req.body

    let theAppointment = await Appointment.findOne({_id: appointment})

    if (!theAppointment){
        createError("not a valid appointment", 400)
        return
    }

    const theSlot = theAppointment?.slots.find(s => s._id.toString() == slot)

    if (!theSlot){
        createError("not a valid slot", 400)
        return
    }

    const isSlotFull = theSlot.maxUsers == theSlot.users

    if (isSlotFull){
        createError("slot is full", 400)
        return
    }

    const newBooking = new Booking({
        appointment,
        slot,
        user: req.user._id
    })

    await newBooking.save()

    theAppointment.slots = theAppointment.slots.map(s => {
        if (s._id.toString() == slot){
            
            return {...s, users: s.users+1}
        }
        return s
    })

    

    await theAppointment.save()

    res.status(200).json({msg: "booking created"})
}

const getBooking = async(req, res) => {
    const myBookings = await Booking.find({user: req.user._id}).populate("appointment")

    res.status(200).json({myBookings})
}

const modifyBooking = async(req, res) => {
    const {bookingid} = req.params
    const {appointment, slot} = req.body

    const theAppointment = await Appointment.findOne({_id: appointment})

    if (!theAppointment){
        createError("not a valid appointment", 400)
        return
    }

    const theSlot = theAppointment?.slots.find(s => s._id.toString() == slot)

    if (!theSlot){
        createError("not a valid slot", 400)
        return
    }

    const isSlotFull = theSlot.maxUsers == theSlot.users

    if (isSlotFull){
        createError("slot is full", 400)
        return
    }

    const theBooking = await Booking.findOne({_id: bookingid, user: req.user._id, appointment})

    if (!theBooking){
        createError("invalid booking", 400)
        return
    }


    if (theBooking.slot.toString() == slot.toString()){
        createError("already booked the slot", 400)
        return
    }

    const oldSlot = theBooking.slot

    theBooking.slot = slot

    await theBooking.save()

    theAppointment.slots = theAppointment.slots.map(s => {
        if (s._id.toString() == slot){
            return {...s, users: s.users+1}
        }
        if (s._id.toString() == oldSlot){
            return {...s, users: s.users-1}
        }
        return s
    })

    await theAppointment.save()

    res.status(200).json({msg: "booking updated"})
}

const deleteBooking = async(req, res) => {
    const {bookingid} = req.params

    const deletedBooking = await Booking.findByIdAndDelete({_id: bookingid, user: req.user._id})

    const theAppointment = await Appointment.findOne({_id: deletedBooking.appointment})

    theAppointment.slots = theAppointment.slots.map(s => {
        if (s._id.toString() == deletedBooking.slot){
            return {...s, users: s.users-1}
        }
        return s
    })

    await theAppointment.save()

    res.status(200).json({msg: "booking deleted"})
}

module.exports = {createBooking, getBooking, modifyBooking, deleteBooking}