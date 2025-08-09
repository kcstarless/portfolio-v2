import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as services from 'services'

export const fetchTechs = createAsyncThunk('techs/fetchAll', async () => {
    await new Promise((res) => setTimeout(res, 1500))  
    return await services.tech.getAll()
})

export const createTech = createAsyncThunk('techs/create',  async (newTech, { dispatch, rejectWithValue }) => {
  await new Promise((res) => setTimeout(res, 1500))  
  try {
      const created = await services.tech.create(newTech)
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
    await new Promise((res) => setTimeout(res, 1500))
    try {
      await services.tech.remove(id)
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

export const updateTech = createAsyncThunk('techs/update', async (existingTech, { dispatch, rejectWithValue}) => {
    await new Promise((res) => setTimeout(res, 1500))
    try {
      const updated = await services.tech.update(existingTech)
      dispatch(fetchTechs())
      return updated
    } catch(error) {
      const payload = error.response
        ? { status: error.response.status, data: error.response.data }
        : { message: error.message }
      return rejectWithValue(payload)
    }
})

const techSlice = createSlice({
  name: 'techs',
  initialState: {
    items: [],
    status: 'idle',    // for fetchTechs only (could rename to fetchStatus)
    loading: false,    // generic loading flag for create/update/delete
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch techs
      .addCase(fetchTechs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTechs.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchTechs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // Create tech
      .addCase(createTech.pending, (state) => {
        state.loading = true
      })
      .addCase(createTech.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createTech.rejected, (state) => {
        state.loading = false
      })
      // Update tech
      .addCase(updateTech.pending, (state) => {
        state.loading = true
      })
      .addCase(updateTech.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateTech.rejected, (state) => {
        state.loading = false
      })
      // Delete tech
      .addCase(deleteTech.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTech.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteTech.rejected, (state) => {
        state.loading = false
      })
  }
})

export default techSlice.reducer