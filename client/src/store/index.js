import { configureStore } from "@reduxjs/toolkit"
import techReducer from './techSlice'
import authReducer from './authSlice'

const store = configureStore({
    reducer: {
        techs: techReducer,
        auth: authReducer,
    }
})

export default store