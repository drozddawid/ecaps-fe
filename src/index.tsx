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

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const darkTheme = createTheme({
    palette: {
        background: {
            default: "#232323"
        },
        text: {
            primary: "#ffffff"
        },
        mode: 'dark'
    }
});
const lightTheme = createTheme({
    palette: {
        background: {
            default: "#eaeaea"
        },
        mode: 'light'
    }
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={window.localStorage.getItem("theme") === "light" ? lightTheme : darkTheme}>
                    <CssBaseline/>
                    <App/>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
