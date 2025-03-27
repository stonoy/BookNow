import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { customFetch } from "../utils"
import { toast } from "react-toastify"

const initialState = {
    user: {},
    users: [],
    submitting: false,
    loading: false
}

export const loginUser = createAsyncThunk("user/login", 
    async (data, thunkAPI) => {
       
        try {
            const resp = await customFetch.post("/user/login", data)
            
            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const registerUser = createAsyncThunk("user/register", 
    async (data, thunkAPI) => {
       
        try {
            const resp = await customFetch.post("/user/register", data)
            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const logoutUser = createAsyncThunk("user/logout", 
    async (_, thunkAPI) => {
       
        try {
            const resp = await customFetch.post("/user/logout")

            

            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const getAllUsers = createAsyncThunk("user/getAllUsers", 
    async (_, thunkAPI) => {
        try {
            const resp = await customFetch.get("/user/getallusers")

            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const setOwner = createAsyncThunk("user/setOwner", 
    async (userId, thunkAPI) => {
        try {
            const resp = await customFetch.patch(`/user/setowner/${userId}`)
            thunkAPI.dispatch(getAllUsers())
            return resp?.data?.msg
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: JSON.parse(localStorage.getItem("user")) || initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(loginUser.fulfilled, (state, {payload}) => {
            state.submitting = false
            state.user = payload?.theUser
            localStorage.setItem("user", JSON.stringify(state))
            toast.success("logged In!")
        }).addCase(loginUser.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        }).addCase(registerUser.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(registerUser.fulfilled, (state, {payload}) => {
            state.submitting = false
            toast.success("user registered ... login now!")
        }).addCase(registerUser.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        }).addCase(logoutUser.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(logoutUser.fulfilled, (state, {payload}) => {
            state.submitting = false
            toast.success("successfully logged out")
        }).addCase(logoutUser.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        }).addCase(setOwner.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(setOwner.fulfilled, (state, {payload}) => {
            state.submitting = false
            toast.success("successfully owner set")
        }).addCase(setOwner.rejected, (state, {payload}) => {
            state.submitting = false
            toast.error(payload)
        }).addCase(getAllUsers.pending, (state, {payload}) => {
            state.loading = true
        }).addCase(getAllUsers.fulfilled, (state, {payload}) => {
            state.loading = false
            state.users = payload?.users
            localStorage.setItem("user", JSON.stringify(state))
        }).addCase(getAllUsers.rejected, (state, {payload}) => {
            state.loading = false
            toast.error(payload)
        })
    }
})

export default userSlice.reducer