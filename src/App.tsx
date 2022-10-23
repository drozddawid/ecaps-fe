import "./App.css";
import React from 'react';
import {LoginPage} from "./pages/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {useSelector} from "react-redux";
import {RootState} from "./store/Store";

declare global {
    let google: any;
}

function App() {
    const isLoggedIn = useSelector((state: RootState) => state.UserSlice.isLoggedIn)
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    {isLoggedIn ?
                        <Route path="/" element={<HomePage/>}/> :
                        <Route path="/" element={<LoginPage/>}/>
                    }
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
