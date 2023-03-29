import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {JwtToken} from "../model/auth/Jwt";
import jwt_decode from "jwt-decode";

interface UserState {
    isLoggedIn: boolean,
    userToken?: string,
    parsedUserToken?: JwtToken,
    isServerManager: boolean
}

const initialUserState: UserState = {
    isLoggedIn: false,
    userToken: undefined,
    parsedUserToken: undefined,
    isServerManager: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserState: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
        },
        setUserToken: (state, action: PayloadAction<string>) => {
            state.userToken = action.payload;
            state.parsedUserToken = jwt_decode<JwtToken>(action.payload);
        },
        handleLogin: (state) => {
            state.isLoggedIn = true;
        },
        handleLogout: (state) => {
            state.isLoggedIn = false;
            state.userToken = undefined;
            state.parsedUserToken = undefined;
        },
        handleLoginOrLogout: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
            if (!state.isLoggedIn) {
                state.userToken = undefined;
                state.parsedUserToken = undefined;
            }
        }
    }
});

export const {
    setUserState,
    setUserToken,
    handleLogin,
    handleLogout,
    handleLoginOrLogout,
} = userSlice.actions;
export {userSlice};
export type {UserState};
