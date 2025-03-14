const mongoose = require("mongoose")

const SlotSchema = new mongoose.Schema({
    starts: {
        type: Date,
        required: true
    },
    users: {
        type: Number,
        required: true,
        default: 0
    },
    maxUsers: {
        type: Number,
        required: true,
        default: 0
    }
})


const AppointSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    timing: {
        type : Date,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ontime", "rescheduled", "cancelled"],
            message: "appointment status type not supported"
        },
        required: true,
        default: "ontime"
    },
    slots: {
        type: [SlotSchema],
        required: true
    }
}, {timestamps: true})

const Appointment = mongoose.model("Appointment", AppointSchema)

module.exports = Appointment