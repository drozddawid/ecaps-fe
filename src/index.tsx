import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import {Provider} from "react-redux";
import {persistor, store} from "./store/Store";
import {PersistGate} from "redux-persist/integration/react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "./store/LocalStorage";
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const darkTheme = createTheme({
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
            primary: "#ffffff"
        }
    }
});
const lightTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#000000'
        },
        background: {
            paper: '#000000',
            default: '#eaeaea',
        },
        text: {
            primary: "#000000"
        }
    }
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <GoogleOAuthProvider clientId="632337224366-bk011vp1s1cnbfmerurvf8lkvf95jdcf.apps.googleusercontent.com">
                    <ThemeProvider theme={getTheme() === "light" ? lightTheme : darkTheme}>
                        <CssBaseline enableColorScheme={true}/>
                        <App/>
                    </ThemeProvider>
                </GoogleOAuthProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
