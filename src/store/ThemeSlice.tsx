import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTheme} from "./LocalStorage";

interface ThemeSlice {
    theme: string,
}

const initialUserState: ThemeSlice = {
    theme: getTheme() || "dark"
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialUserState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
            setTheme(action.payload)
        }
    }
});

export const {
    setTheme,
} = themeSlice.actions;
export {themeSlice};
export type {ThemeSlice};
