import React, {useEffect} from "react";
import {GoogleJwtResponse, JwtToken} from "../auth/Jwt";
import jwt_decode from "jwt-decode";
import "./LoginPage.css"
import {useDispatch} from "react-redux";
import {handleLoginWithUserToken} from "../store/UserSlice";
import {Container, Grid, Paper, Tooltip, Typography} from "@mui/material";
import ForumIcon from '@mui/icons-material/Forum';

const LoginPage = () => {
    const dispatch = useDispatch();

    const initializeGoogleId = () => {
        google.accounts.id.initialize({
            client_id: "123",
            callback: handleLoginButtonClick
        })
    }
    const renderLoginButton = () => {
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
    }
    const handleLoginButtonClick = (response: GoogleJwtResponse) => {
        const userToken = jwt_decode<JwtToken>(response.credential);
        dispatch(handleLoginWithUserToken(userToken))
    }

    useEffect(() => {
        initializeGoogleId();
        renderLoginButton();
    });

    return (
        <div className="login_page">
            <Container maxWidth="md">
                <Paper elevation={1} variant={"outlined"}>
                    <Grid container spacing={3} padding={12}>
                        <Grid item xs={12}>
                            <Tooltip title={"ecaps comes from space reversed :)"}>
                                <Typography variant="h2" className="logo">ecaps <ForumIcon/></Typography>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" className="longer_logo">electronic community and party space</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div id="signInDiv" className="sign_in"></div>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}
export {LoginPage};