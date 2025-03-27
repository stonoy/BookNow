import axios from "axios"
import moment from "moment-timezone"

export const links = [
    {id: 1, name: "Home", link:"/"},
    {id: 2, name: "My Bookings", link:"/bookings"},
    {id: 3, name: "Appointments", link:"/appointments"},
    {id: 4, name: "Admin", link:"/admin"},
]

export const customFetch = axios.create({
    baseURL: location.hostname == "localhost" ? "http://localhost:8080/api/v1" : "/api/v1",
    withCredentials: true,
})

export const getLocalFromUtcTime = (utcTime, format) => {
    return moment.utc(utcTime).tz("Asia/Kolkata").format(format)
}

export const getUtcFromLocalTime = (localTime) => {
    return moment.tz(localTime, "Asia/Kolkata").toISOString()
}

export const getCurrentLocalTime = (format) => {
    return moment().tz("Asia/Kolkata").format(format)
}