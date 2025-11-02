import { createSlice } from "@reduxjs/toolkit";

const savedToken  = localStorage.getItem("token");
const savedUserId = localStorage.getItem("userId");

const initialState={
    isLoggedIn:!!savedToken,
    bearerToken: savedToken || "",
    userId: savedUserId || "",
};

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    login(state, action){
        state.isLoggedIn = true;
        state.bearerToken = action.payload.token;
        state.userId = action.payload.userId;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userId", action.payload.userId);
    },
    logout(state){
        state.isLoggedIn = false;
        state.bearerToken = "";
        state.userId = null;
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    }
  }  
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;