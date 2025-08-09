import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as services from 'services'

export const fetchAllProjects = createAsyncThunk('projects/all', async () => {
    await new Promise((res) => setTimeout(res, 1500))  
    return await services.project.getAll()
})

export const fetchProjects = createAsyncThunk('projects', async () => {
    await new Promise((res) => setTimeout(res, 1500))  
    return await services.project.getUsersProjects()
})

export const createProject = createAsyncThunk('projects/create', async (newProject, { dispatch, rejectWithValue}) => {
    await new Promise((res) => setTimeout(res, 1500))  
    try {
        const created = await services.project.create(newProject)
        dispatch(fetchProjects())
        return created
    } catch (error) {
        //   console.log(error)
        const payload = error.response
            ? { status: error.response.status, data: error.response.data }
            : { message: error.message }
      return rejectWithValue(payload)
    }
})

export const updateProject = createAsyncThunk('techs/update', async (projectToUpdate, { dispatch, rejectWithValue}) => {
    await new Promise((res) => setTimeout(res, 1500))
    try {
      const updated = await services.project.update(projectToUpdate)
      dispatch(fetchProjects())
      return updated
    } catch(error) {
      const payload = error.response
        ? { status: error.response.status, data: error.response.data }
        : { message: error.message }
      return rejectWithValue(payload)
    }
})

export const deleteProject = createAsyncThunk('projects/delete', async (id, { dispatch, rejectWithValue}) => {
    await new Promise((res) => setTimeout(res, 1500))  
    try {
      await services.project.remove(id)
      dispatch(fetchProjects())
      return id
    } catch (error) {
      // console.log(error)
      const payload = error.response
        ? { status: error.response.status, data: error.response.data }
        : { message: error.message }
      return rejectWithValue(payload)
    }
  }
)

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        items: [],
        allItems: [],    
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchAllProjects.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllProjects.fulfilled, (state, action) => {
            state.allItems = action.payload
            state.status = 'succeeded'
        })
        .addCase(fetchAllProjects.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'succeeded'
        })
        .addCase(fetchProjects.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchProjects.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(createProject.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createProject.fulfilled, (state) => {
            state.status = 'succeeded'
            state.error = null
        })
        .addCase(createProject.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload?.data?.error || action.payload?.message || action.error.message
        })
        .addCase(deleteProject.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(deleteProject.fulfilled, (state) => {
            state.status = 'succeeded'
            state.error = null
        })
        .addCase(deleteProject.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload?.data?.error || action.payload?.message || action.error.message
        })
        .addCase(updateProject.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateProject.fulfilled, (state) => {
            state.status = 'succeeded'
            state.error = null
        })
        .addCase(updateProject.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload?.data?.error || action.payload?.message || action.error.message
        })
    },
})

export default projectSlice.reducer