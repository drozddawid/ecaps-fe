import "./App.css";
import React from 'react';
import {LoginPage} from "./pages/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/homepage/HomePage";
import {useSelector} from "react-redux";
import {RootState} from "./store/Store";
import {SpacePage} from "./pages/homepage/SpacePage";

declare global {
    let google: any;
}

function App() {
    const isLoggedIn = useSelector((state: RootState) => state.UserSlice.isLoggedIn)
    return (
        <div className="app">
            <BrowserRouter>

                    {isLoggedIn ?
                        <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/spaces/:spaceHash" element={<SpacePage/>}/>
                        </Routes>
                        :
                        <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        </Routes>
                    }
            </BrowserRouter>
        </div>
    );
}

export default App;
