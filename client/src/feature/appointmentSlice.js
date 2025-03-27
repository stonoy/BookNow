import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { customFetch } from "../utils"
import { data } from "react-router-dom"
import { toast } from "react-toastify"

const initialState = {
    appointments: [],
    theAppointment: {},
    myAppointments: [],
    myBookings: [],
    submitting: false,
    loading: false,
    numOfPages: 1,
    page: 1
}

export const getAppointments = createAsyncThunk("appointment/getAppointments", 
    async (path, thunkAPI) => {
        try {
            const resp = await customFetch(path)
            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const getMyAppointments = createAsyncThunk("appointment/getMyAppointments", 
    async (path, thunkAPI) => {
        try {
            const resp = await customFetch(path)
            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const getMyBookings = createAsyncThunk("appointment/getMyBookings", 
    async (path, thunkAPI) => {
        // console.log(path)
        try {
            const resp = await customFetch(path)
            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const createAppointment = createAsyncThunk("appointment/createAppointment", 
    async (data, thunkAPI) => {
        try {
            const resp = await customFetch.post("/appointment/createappoint", data)
            return resp?.data?.msg
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const createBooking = createAsyncThunk("appointment/createBooking", 
    async (data, thunkAPI) => {
        try {
            const resp = await customFetch.post("/booking/createbooking", data)
            return resp?.data?.msg
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const updateBooking = createAsyncThunk("appointment/updateBooking", 
    async ({appointment, slot, bookingId}, thunkAPI) => {
        const {page} = thunkAPI.getState().appointment
        try {
            const resp = await customFetch.patch(`/booking/modifybooking/${bookingId}`, {appointment, slot})
            thunkAPI.dispatch(getMyBookings(`/booking/getmybookings?page=${page}`))
            return resp?.data?.msg
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const deleteBooking = createAsyncThunk("appointment/deleteBooking", 
    async ( bookingId, thunkAPI) => {
        const {page} = thunkAPI.getState().appointment
        try {
            const resp = await customFetch.delete(`/booking/deletebooking/${bookingId}`)
            thunkAPI.dispatch(getMyBookings(`/booking/getmybookings?page=${page}`))
            return resp?.data?.msg
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const rescheduleAppointment = createAsyncThunk("appointment/rescheduleAppointment",
    async ( {data, appointmentId}, thunkAPI) => {
        const {page} = thunkAPI.getState().appointment
        try {
            const resp = await customFetch.patch(`/appointment/reschedule/${appointmentId}`, data)

            thunkAPI.dispatch(getMyAppointments(`/appointment/getmyappointments?page=${page}`))
            
            return resp?.data?.msg
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const cancelAppointment = createAsyncThunk("appointment/cancelAppointment",
    async ( appointmentId, thunkAPI) => {
        const {page} = thunkAPI.getState().appointment
        try {
            const resp = await customFetch.patch(`/appointment/cancel/${appointmentId}`)
            thunkAPI.dispatch(getMyAppointments(`/appointment/getmyappointments?page=${page}`))
            return resp?.data?.msg
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

const appointmentSlice = createSlice({
    name: "appointment",
    initialState: JSON.parse(localStorage.getItem("appointment")) || initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAppointments.pending, (state, {payload}) => {
            state.loading = true
        }).addCase(getAppointments.fulfilled, (state, {payload}) => {
            state.loading = false
            state.appointments = payload?.appointments
            state.numOfPages = payload?.numOfPages
            state.page = payload?.page
            localStorage.setItem("appointment", JSON.stringify(state))
        }).addCase(getAppointments.rejected, (state, {payload}) => {
            state.loading = false
            toast.error(payload)
        }).addCase(createAppointment.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(createAppointment.fulfilled, (state, {payload}) => {
            state.submitting = false
            toast.success(payload)
        }).addCase(createAppointment.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        }).addCase(getMyAppointments.pending, (state, {payload}) => {
            state.loading = true
        }).addCase(getMyAppointments.fulfilled, (state, {payload}) => {
            state.loading = false
            state.myAppointments = payload?.myAppointments
            state.numOfPages = payload?.numOfPages
            state.page = payload?.page
            localStorage.setItem("appointment", JSON.stringify(state))
        }).addCase(getMyAppointments.rejected, (state, {payload}) => {
            state.loading = false
            toast.error(payload)
        }).addCase(getMyBookings.pending, (state, {payload}) => {
            state.loading = true
        }).addCase(getMyBookings.fulfilled, (state, {payload}) => {
            state.loading = false
            state.myBookings = payload?.myBookings
            state.numOfPages = payload?.numOfPages
            state.page = payload?.page
            localStorage.setItem("appointment", JSON.stringify(state))
        }).addCase(getMyBookings.rejected, (state, {payload}) => {
            state.loading = false
            toast.error(payload)
        }).addCase(createBooking.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(createBooking.fulfilled, (state, {payload}) => {
            state.submitting = false
            toast.success(payload)
        }).addCase(createBooking.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        }).addCase(updateBooking.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(updateBooking.fulfilled, (state, {payload}) => {
            state.submitting = false
            toast.success(payload)
        }).addCase(updateBooking.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        }).addCase(deleteBooking.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(deleteBooking.fulfilled, (state, {payload}) => {
            state.submitting = false
            toast.success(payload)
        }).addCase(deleteBooking.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        }).addCase(rescheduleAppointment.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(rescheduleAppointment.fulfilled, (state, {payload}) => {
            state.submitting = false
            toast.success(payload)
        }).addCase(rescheduleAppointment.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        }).addCase(cancelAppointment.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(cancelAppointment.fulfilled, (state, {payload}) => {
            state.submitting = false
            toast.success(payload)
        }).addCase(cancelAppointment.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        })
    }
})

export default appointmentSlice.reducer
