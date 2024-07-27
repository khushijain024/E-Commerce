import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (email) => {
  // console.log(email)
  const response = await axios.post( `${import.meta.env.VITE_API_URI}/users/login`, email );
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", response.data.role);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
    status: "idle",
    error: null,
    auth: false,
    user: null,
  },
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.auth = action.payload.auth;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      state.auth = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = "idle";
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.auth = true;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        // console.log(action)
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
