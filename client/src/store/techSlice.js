import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import techService from '../services/techService'

export const fetchTechs = createAsyncThunk('techs/fetchAll', async () => {
    return await techService.getAll()
})

export const createTech = createAsyncThunk('techs/create',  async (newTech, { dispatch, rejectWithValue }) => {
  await new Promise((res) => setTimeout(res, 1500))  
  try {
      const created = await techService.create(newTech)
      dispatch(fetchTechs())
      return created
    } catch (error) {
    //   console.log(error)
      const payload = error.response
        ? { status: error.response.status, data: error.response.data }
        : { message: error.message }
      return rejectWithValue(payload)
    }
  }
)

export const deleteTech = createAsyncThunk('techs/delete', async (id, { dispatch, rejectWithValue}) => {
    await new Promise((res) => setTimeout(res, 5000))
    try {
      await techService.remove(id)
      dispatch(fetchTechs())
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

const techSlice = createSlice({
    name: 'techs',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        deletingId: null,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchTechs.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'succeeded'
        })
        .addCase(fetchTechs.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchTechs.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(createTech.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createTech.fulfilled, (state) => {
            state.status = 'succeeded'
            state.error = null
        })
        .addCase(createTech.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload?.data?.error || action.payload?.message || action.error.message
        })
        .addCase(deleteTech.pending, (state, action) => {
            state.status = 'loading'
            state.deletingId = action.meta.arg 
        })
        .addCase(deleteTech.fulfilled, (state) => {
            state.status = 'succeeded'
            state.error = null
            state.deletingId = null
        })
        .addCase(deleteTech.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload?.data?.error || action.payload?.message || action.error.message
            state.deletingId = null
        })
    },
})

export default techSlice.reducer