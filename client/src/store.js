import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./feature/userSlice"
import appointmentSlice from "./feature/appointmentSlice"

export const store = configureStore({
    reducer : {
        user: userReducer,
        appointment: appointmentSlice
    }
})
