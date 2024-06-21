import { createSlice } from "@reduxjs/toolkit"
import { Provider } from "react-redux"


const initialState = {value: {username: "", password: "", email: "test@gmail.com"}}

export const userSlice = createSlice({
    name: "user",
    initialState,
    //mutates the state
    reducers: {
        login: (state, action) => {
            console.log("Action created")
            state.value = action.payload
        },
        logout: (state, action)=> {
            state.value = initialState.value
        },
        setPass: (state, action)=> {
            console.log(action.payload)
            state.value.password = action.payload
        },
        setEmail: (state, action)=>{
            state.value.email = action.payload
        }
        
    }
})

export const {login, logout, setPass, setEmail} = userSlice.actions
export default userSlice.reducer