import React, {useEffect, useState} from "react";
import "./LoginPage.css"
import {useDispatch} from "react-redux";
import {handleLogin, setUserToken} from "../store/UserSlice";
import {Alert, Box, Container, Grid, Paper, Tooltip, Typography} from "@mui/material";
import ForumIcon from '@mui/icons-material/Forum';
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {getTheme} from "../store/LocalStorage";
import {signUp} from "../fetch/UserControllerFetches";

const LoginPage = () => {
    const dispatch = useDispatch();
    const [wentWrong, setWentWrong] = useState(false);

    const handleLoginSuccess = (response: CredentialResponse) => {
        if (response.credential != null) {
            dispatch(setUserToken(response.credential))
            signUp()
                .then((signUpResp) => {
                    if (signUpResp.status === 200) {
                        dispatch(handleLogin())
                    } else {
                        setWentWrong(true)
                    }
                })
                .catch(() => setWentWrong(true))
        }
    }

    const handleLoginError = () => {
        setWentWrong(true)
    }

    return (
        <div className="login_page">
            <Container maxWidth="md">
                <Paper variant={"outlined"}>
                    <Grid container spacing={3} paddingBottom={15} paddingTop={15}>
                        <Grid item xs={12}>
                            <Tooltip title={"ecaps comes from space reversed :)"}>
                                <Typography variant="h2" className="logo">ecaps <ForumIcon/></Typography>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" className="longer_logo">electronic community and party
                                space</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={"sign_in"}>
                                <GoogleLogin onSuccess={handleLoginSuccess}
                                             onError={handleLoginError}
                                             theme={getTheme() === "light" ? "outline" : "filled_black"}
                                             shape={"square"}
                                             size={"medium"}
                                             text={"signin_with"}
                                             width={"230"}
                                             logo_alignment={"left"}

                                />
                            </div>
                        </Grid>
                    </Grid>

                </Paper>
                {wentWrong &&
                    <Alert severity={"error"} onClose={() => setWentWrong(false)}>Something went wrong, please try
                        again.</Alert>
                }
            </Container>
        </div>
    );
}
export {LoginPage};