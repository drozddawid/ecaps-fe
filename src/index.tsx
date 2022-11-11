import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import {Provider, useSelector} from "react-redux";
import {persistor, RootState, store} from "./store/Store";
import {PersistGate} from "redux-persist/integration/react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {GoogleOAuthProvider} from "@react-oauth/google";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#101010'
        },
        background: {
            paper: '#0e0e0e',
            default: '#232323',
        },
        text: {
            primary: "#ffffff",
            disabled: "#696969"
        }
    }
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#000000'
        },
        background: {
            paper: 'rgb(236,236,236)',
            default: '#f1f1f1',
        },
        text: {
            primary: "#000000",
            secondary: "#000000",
            disabled: "#696969"
        }
    }
});
const Index = () => {
    const theme = useSelector((state: RootState) => state.ThemeSlice.theme)
    return (
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <GoogleOAuthProvider clientId="632337224366-bk011vp1s1cnbfmerurvf8lkvf95jdcf.apps.googleusercontent.com">
                        <ThemeProvider theme={theme === "light"? lightTheme : darkTheme}>
                            <CssBaseline enableColorScheme={true}/>
                            <App/>
                        </ThemeProvider>
                    </GoogleOAuthProvider>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <GoogleOAuthProvider clientId="632337224366-bk011vp1s1cnbfmerurvf8lkvf95jdcf.apps.googleusercontent.com">
                    <Index />
                </GoogleOAuthProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
