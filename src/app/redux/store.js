import { configureStore } from "@reduxjs/toolkit";
import user from "./features/userReducer";
import search from './features/searchReducer'

export const store = configureStore({
    reducer: {
      user: user,
      search: search
    }
})
  