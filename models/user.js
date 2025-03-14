const mongoose = require("mongoose")
const validator = require("validator")
const createError = require("../errorClass")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, "min length for name is 2"],
        maxLength: [20, "max length for name is 20"],
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "user email must be unique"],
        validate: function(email){
            if(!validator.isEmail(email)){
                createError("email is not valid", 400)
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ["user", "owner", "admin"],
            message: "role type did not match"
        },
        required: true,
        default: "user"
    }
}, {timestamps: true})

UserSchema.methods.comparePassword = async function(passwordText){
    return await bcrypt.compare(passwordText, this.password)
}

UserSchema.methods.createJwt = function(){
    return jwt.sign({_id: this._id, role: this.role}, process.env.JWT_SECRET, {expiresIn: "24h"})
}

const User = mongoose.model("User", UserSchema)

module.exports = User