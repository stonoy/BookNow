const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {timestamps: true})

BookingSchema.index({appointment: 1, user: 1}, {unique: true})

const Booking = mongoose.model("Booking", BookingSchema)

module.exports = Booking