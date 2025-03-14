const createError = require("../errorClass")
const jwt = require("jsonwebtoken")
const User = require("../models/user")


const userAuth = (...permittedRoles) => {
    return async (req, res, next) => {
        const {token} = req.cookies
    
        if (!token){
            createError("no token provided", 400)
            return
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        if (!decoded?._id || !decoded?.role){
            createError("invalid token", 400)
            return
        }
    
        const theUser = await User.findById(decoded._id)
    
        if (!theUser){
            createError("no user found", 400)
            return
        }

        if(!permittedRoles.includes(decoded?.role)){
            createError("unauthorised request", 403)
            return
        }
    
        req.user = theUser
        next()
    }
}

module.exports = userAuth