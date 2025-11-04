import { createSlice } from "@reduxjs/toolkit";

const savedToken  = localStorage.getItem("token");
const savedUserId = localStorage.getItem("userId");
const savedUserEmail = localStorage.getItem("userEmailId")

const initialState={
    isLoggedIn:!!savedToken,
    bearerToken: savedToken || "",
    userId: savedUserId || "", 
    userEmailId: savedUserEmail ||"",
};

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    login(state, action){
        state.isLoggedIn = true;
        state.bearerToken = action.payload.token;
        state.userId = action.payload.userId;
        state.userEmailId = action.payload.userEmail;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userId", action.payload.userId);
        localStorage.setItem("userEmailId", action.payload.userEmail);
    },
    logout(state){
        state.isLoggedIn = false;
        state.bearerToken = "";
        state.userId = null;
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmailId")
    }
  }  
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;