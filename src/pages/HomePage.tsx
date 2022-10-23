import React from "react";
import {handleLogout} from "../store/UserSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/Store";
import {Container} from "@mui/material";

const HomePage = () => {
    const userToken = useSelector((state: RootState) => state.UserSlice.userToken);
    const dispatch = useDispatch();
    return (
        <Container maxWidth="md">
            <h1>Cześć {userToken?.given_name}</h1>
            <button onClick={() => dispatch(handleLogout())}>logout</button>
        </Container>
    );
}


export {HomePage};