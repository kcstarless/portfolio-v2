import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import projectService from '../services/projectService'

export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
    return await projectService.getAll()
})

export const createProject = createAsyncThunk('projects/create', async (newProject, { dispatch, rejectWithValue}) => {
    try {
        const created = await projectService.create(newProject)
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


export const deleteProject = createAsyncThunk('projects/delete', async (id, { dispatch, rejectWithValue}) => {
    try {
      await projectService.remove(id)
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
    name: 'techs',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
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
    },
})

export default projectSlice.reducer