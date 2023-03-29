import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    Switch,
    ThemeProvider,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleLogout} from "../store/UserSlice";
import {getTheme} from "../store/LocalStorage";
import {setTheme} from "../store/ThemeSlice"
import {RootState} from "../store/Store";
import {useNavigate} from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ffffff'
        },
        background: {
            paper: '#000000',
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
            paper: '#9319be',
            default: '#eaeaea',
        },
        text: {
            primary: "#000000"
        }
    }
});

export const EcapsBar = (props: {
    showMySpaces?: boolean,
    createSpaceClickAction?: () => void,
    createPostClickAction?: () => void,
    spaceSettingsAction?: () => void
}) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.UserSlice.parsedUserToken);
    const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={getTheme() === "light" ? lightTheme : darkTheme}>
            <AppBar position={"static"}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{}}>
                        <Box>
                            <Tooltip title={"homepage"}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    onClick={() => navigate("/")}
                                    sx={{
                                        mr: 2,
                                        fontFamily: 'monospace',
                                        fontWeight: 900,
                                        letterSpacing: '.1rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        "&:hover": {
                                            cursor: "grab"
                                        }
                                    }}
                                >
                                    ecaps
                                    <ForumIcon fontSize={"small"} style={{marginTop: 5, marginLeft: 3}}/>
                                </Typography>
                            </Tooltip>
                        </Box>
                        {props.showMySpaces &&
                            <Box>
                                <Button color="secondary" onClick={() => navigate("/")}>My spaces</Button>
                            </Box>
                        }
                        {props.createSpaceClickAction &&
                            <Box>
                                <Button color="secondary" onClick={props.createSpaceClickAction}>New space</Button>
                            </Box>
                        }
                        {props.createPostClickAction &&
                            <Box>
                                <Button color="secondary" onClick={props.createPostClickAction}>New post</Button>
                            </Box>
                        }
                        {props.spaceSettingsAction &&
                            <Box>
                                <Button color="secondary" onClick={props.spaceSettingsAction}>Space settings</Button>
                            </Box>
                        }
                        <Box sx={{flexGrow: 1}}/>
                        <Box sx={{mr: 1}}>
                            <Switch checked={theme !== "light"} onChange={theme === "light"? () => {dispatch(setTheme("dark"))} : () => {dispatch(setTheme("light"))}}></Switch>
                        </Box>
                        <Box sx={{mr: 1}}>
                            <Avatar src={user?.picture} alt={user?.given_name} sx={{width: 33, height: 33}}></Avatar>
                        </Box>
                        <Box sx={{mr: 1}}>
                            <Typography variant={"subtitle1"}>{user?.name}</Typography>
                        </Box>
                        <Box sx={{mr: 1}}>
                            <Button color="secondary" onClick={() => dispatch(handleLogout())}>Logout</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}