import { configureStore } from "@reduxjs/toolkit"
import techReducer from './techSlice'
import authReducer from './authSlice'
import projectReducer from './projectSlice'

const store = configureStore({
    reducer: {
        techs: techReducer,
        auth: authReducer,
        projects: projectReducer,
    }
})

export default store