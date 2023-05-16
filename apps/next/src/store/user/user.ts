import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const USER_URL = 'http://localhost:5500/user'

type UserState = {
  user: { id: string } | null
  status: 'idle' | 'loading' | 'connected' | 'error'
  error: string | null
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
}

export const isConnected = createAsyncThunk('user/getUser', async () => {
  const response = await fetch(USER_URL + '/me', {
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error)
  }
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(isConnected.fulfilled, (state, action) => {
        state.status = 'connected'
        state.user = action.payload
      })
      .addCase(isConnected.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(isConnected.rejected, (state, action) => {
        state.status = 'error'
        state.user = null
        if (action.error.message) {
          state.error = action.error.message
        }
      })
  },
})

export const getUserState = (state: RootState) => state.user

export default userSlice.reducer
