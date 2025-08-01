import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import techService from '../services/techService'

export const fetchTechs = createAsyncThunk('techs/fetchAll', async () => {
    await new Promise((res) => setTimeout(res, 1500))  
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
    await new Promise((res) => setTimeout(res, 1500))
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

export const updateTech = createAsyncThunk('techs/update', async (existingTech, { dispatch, rejectWithValue}) => {
    await new Promise((res) => setTimeout(res, 1500))
    try {
      const updated = await techService.update(existingTech)
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
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  }
})

export default techSlice.reducer