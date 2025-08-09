import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as services from 'services'
import * as stores from 'stores'

const savedUserJSON = window.localStorage.getItem('currentUser')
const savedUser = savedUserJSON ? JSON.parse(savedUserJSON) : null

if (savedUser) {
  services.project.setToken(savedUser.token)
  services.tech.setToken(savedUser.token)
}

export const loginUser = createAsyncThunk('users/login', async ({ username, password }, { rejectWithValue, dispatch }) => {
    await new Promise((res) => setTimeout(res, 1500))

    try {
        const user = await services.auth.login({ username, password })
        window.localStorage.setItem('currentUser', JSON.stringify(user))
        services.project.setToken(user.token)
        services.tech.setToken(user.token)
        dispatch(stores.fetchProjects())
        return user
    } catch (error) {
        let message = 'network error or server not responding'
        if (error.response) {
          const status = error.response.status
          const serverMessage = error.response.data?.error || 'wrong credentials'
          message = status === 401 ? serverMessage : `login failed: ${serverMessage}`
        }
        return rejectWithValue(message)
    }
  }
)

export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    await new Promise((res) => setTimeout(res, 1500))
    
    window.localStorage.removeItem('currentUser')
    services.project.setToken(null)
    services.tech.setToken(null)
    dispatch(stores.fetchProjects())
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default authSlice.reducer