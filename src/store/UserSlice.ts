import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {JwtToken} from "../auth/Jwt";

interface UserState {
    isLoggedIn: boolean,
    userToken?: JwtToken,
    isServerManager: boolean
}

const initialUserState: UserState = {
    isLoggedIn: false,
    userToken: undefined,
    isServerManager: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserState: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
        },
        setUserToken: (state, action: PayloadAction<JwtToken>) =>{
            state.userToken = action.payload;
        },
        handleLoginWithUserToken: (state, action: PayloadAction<JwtToken>) => {
            state.isLoggedIn = true;
            state.userToken = action.payload;
        },
        handleLogin: (state) => {
            state.isLoggedIn = true;
        },
        handleLogout: (state) => {
            state.isLoggedIn = false;
        },
        handleLoginOrLogout: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
            if(!state.isLoggedIn){
                state.userToken = undefined;
            }
        }
    }
});

export const {setUserState, handleLogin, handleLoginWithUserToken, handleLogout, handleLoginOrLogout, setUserToken} = userSlice.actions;
export {userSlice};
export type {UserState};
