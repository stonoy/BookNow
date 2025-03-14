const createError = require("../errorClass")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const register = async(req, res) => {
    const {name, email, password} = req.body

    if (password.length < 6){
        createError("invalid password", 400)
        return
    }

    let role = "user"
    const numOfUsers = await User.countDocuments()

    if (numOfUsers == 0){
        role = "admin"
    }

    const hash = await bcrypt.hash(password, 10)

    const newUser = new User({
        name,
        email,
        password: hash,
        role
    })

    await newUser.save()

    res.status(201).json({msg: "user created"})
}

const login = async(req, res) => {
    const {email, password} = req.body

    let theUser = await User.findOne({email})

    if (!theUser){
        createError("invalid email", 400)
        return
    }

    const hasPasswordMatched = await theUser.comparePassword(password)

    if (!hasPasswordMatched){
        createError("password not matched", 400)
        return
    }

    const token = theUser.createJwt()

    res.cookie("token", token, {expires: new Date(Date.now() + 1000*60*60*24), httpOnly: true})

    theUser = theUser.toObject()

    delete theUser.password

    res.status(200).json({theUser})
}

const logout = async(req, res) => {
    res.cookie("token", null , {expires: new Date(Date.now()), httpOnly: true})

    res.status(200).json({msg: "user logged out"})
}

const setOwner = async(req, res) => {
    const {userid} = req.params

    await User.findOneAndUpdate({_id: userid}, {role: "owner"})

    res.status(200).json({msg: "user updated"})
}

module.exports = {register, login, logout, setOwner}