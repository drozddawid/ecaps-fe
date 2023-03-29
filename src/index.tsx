import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, {useEffect} from 'react';
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
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <>{clientId?
            <GoogleOAuthProvider clientId={clientId}>
                <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                    <CssBaseline enableColorScheme={true}/>
                    <App/>
                </ThemeProvider>
            </GoogleOAuthProvider>
            :
            <h1>Google services client id is not configured. Please contact the developer or check your .env properties.</h1>
        }
        </>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Index/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
