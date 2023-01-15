import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import http from '../../commons/http'
import UserSession from '../../commons/user-session'
import { API_URL } from '../../setting'

export type LoginUser = {
  email: string
  password: string
}

export type LoginPayload = {
  user: {
    id: number
    idx: string
  }

  payload: {
    access_token: string
  }
}

export type RegUser = {
  email: string
  password: string
}

export type User = {
  id: string
  idx: string
  isActive: boolean
  createdAt: Date
  email: string
}

export type AuthState = {
  loading: 'idle' | 'pending'
  token: string | null
}

const initialState: AuthState = {
  loading: 'idle',
  token: UserSession.getToken(),
}

export const login = createAsyncThunk<AxiosResponse<LoginPayload>, LoginUser>(
  'auth/login',
  async (loginData, { getState, requestId }) => {
    const response = await http.post<LoginPayload>(`${API_URL}/auth/login`, { ...loginData })

    return response
  }
)

export const register = createAsyncThunk<AxiosResponse<User>, RegUser>(
  'auth/register',
  async (newUser, { getState, requestId }) => {
    const response = await http.post<User>(`${API_URL}/auth/register`, { ...newUser })

    return response
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      UserSession.setToken(null)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = 'pending'
    })

    builder.addCase(login.fulfilled, (state, { payload: { data } }) => {
      state.loading = 'idle'
      state.token = data.payload.access_token
      UserSession.setToken(data.payload.access_token)
    })

    builder.addCase(login.rejected, (state) => {
      state.loading = 'idle'
    })

    builder.addCase(register.pending, (state) => {
      state.loading = 'pending'
    })

    builder.addCase(register.rejected, (state) => {
      state.loading = 'idle'
    })
  }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer