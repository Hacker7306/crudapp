import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
export const registerUser = createAsyncThunk('auth/register', async (formdata) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/register/`, formdata)
    return res.data
})
export const loginUser = createAsyncThunk('auth/login', async (formdata)=> {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/token/`, formdata)
    return res.data
})

const userFromStorage = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: userFromStorage || null,
    token: localStorage.getItem('token') || null,
    loading:false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            localStorage.removeItem('token')
            toast.success('loggout sucessfully')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
                state.loading = true
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                toast.success(`${action.payload.username} is registered successfully`)
                state.loading = false
            })
            .addCase(registerUser.rejected, (state,action) => {
            toast.error(`An ERROR with registration`)
            })
            .addCase(loginUser.pending, (state) => {
            state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                toast.success(` logged in`)
                state.loading = false
                state.token = action.payload.access
                localStorage.setItem('token',action.payload.access)
            })
            .addCase(loginUser.rejected, (state,action) => {
                state.loading = false
                alert(`error`)
        })
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer