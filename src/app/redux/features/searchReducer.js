import { createSlice } from "@reduxjs/toolkit"
import { Provider } from "react-redux"


const initialState = {value: {searchQuery: null, productQuery: null, sortQuery: null}}

export const searchSlice = createSlice({
    name: "user",
    initialState,
    //mutates the state
    reducers: {
        setSearchQuery: (state, action)=>{
            state.value.searchQuery = action.payload
        },
        setProductQuery: (state, action)=>{
            state.value.productQuery = action.payload
        },
        setSortQuery: (state, action)=>{
            state.value.sortQuery = action.payload
        }
        
    }
})

export const {setSearchQuery, setProductQuery, setSortQuery} = searchSlice.actions
export default searchSlice.reducer