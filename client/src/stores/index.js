import { configureStore } from "@reduxjs/toolkit"
import techReducer from './_techSlice'
import authReducer from './_authSlice'
import projectReducer from './_projectSlice'

const stores = configureStore({
    reducer: {
        techs: techReducer,
        auth: authReducer,
        projects: projectReducer,
    }
})

export default stores

// Barrel exports for slices
export { 
    loginUser, 
    logoutUser 
} from './_authSlice'

export { 
    fetchTechs, 
    createTech, 
    deleteTech, 
    updateTech 
} from './_techSlice'

export { 
    fetchAllProjects, 
    fetchProjects, 
    createProject, 
    updateProject, 
    deleteProject 
} from './_projectSlice'