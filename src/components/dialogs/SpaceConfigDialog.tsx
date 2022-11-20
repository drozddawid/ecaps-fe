import {Box, Button, Dialog, Grid, Paper, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {SpaceInfoDto} from "../../model/SpaceInfoDto";
import {changeSpaceSettings, ErrorResponse, generateNewSpaceInvitationHash} from "../../fetch/SpaceControllerFetches";
import React, {useState} from "react";
import {TagAdder} from "../TagAdder";
import {AlertInfo, AlertStack} from "../AlertStack";
import {CodeResponse, useGoogleLogin} from "@react-oauth/google";
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import {authorizeSpaceGoogleApi} from "../../fetch/UserControllerFetches";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

export const SpaceConfigDialog = (
    props: {
        open: boolean,
        setOpen: (isOpen: boolean) => void,
        spaceInfo: SpaceInfoDto
        setSpaceInfo: (spaceInfo: SpaceInfoDto) => void
    }
) => {
    const [spaceInfo, setSpaceInfo] = useState<SpaceInfoDto>(JSON.parse(JSON.stringify(props.spaceInfo)));
    const [alerts, setAlerts] = useState<AlertInfo[]>([]);


    const handleClose = () => {
        props.setOpen(false);
    }
    const handleSave = () => {
        if (spaceInfo.name.length < 1) {
            addAlert({type: "warning", message: "Space name can't be blank."})
            return;
        }
        changeSpaceSettings({
            id: spaceInfo.id,
            name: spaceInfo.name,
            isActive: spaceInfo.isActive,
            allowedTags: spaceInfo.allowedTags
        }).then((r: SpaceInfoDto) => {
            props.setSpaceInfo(r)
            addAlert({type: "success", message: "Saved successfully."});
            setTimeout(() => props.setOpen(false), 1500);
        })
            .catch((error: Error) => {
                addAlert({type: "error", message: error.message});
                console.log(error.message);
            })

    }
    const copyInvitationHash = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_FRONTEND_ADDRESS}/join/${spaceInfo.invitationHash}`)
            .catch((e: Error) => console.log(e.message));
    }

    const addAlert = (alert: AlertInfo) => {
        if (!alerts.some(a => a.type === alert.type && a.message === alert.message)) {
            setAlerts(alerts.concat(alert))
            setTimeout(() => setAlerts(alerts.filter(a => a.type !== alert.type && a.message !== alert.message)), 5000);
        }
    }

    const generateNewInvitationHash = () => {
        generateNewSpaceInvitationHash(props.spaceInfo.id)
            .then((spaceInfo: SpaceInfoDto) => {
                setSpaceInfo(spaceInfo);
                addAlert({type: "success", message: "New invitation link generated."});
            })
            .catch((error: Error) => {
                addAlert({type: "error", message: error.message});
                console.log(error.message);
            })
    }

    const authorizeGoogleScope = useGoogleLogin({
        flow: "auth-code",
        scope: "https://www.googleapis.com/auth/drive.file",//space delimited
        select_account: true,
        onSuccess: codeResponse => handleGoogleScopeAuthorization(codeResponse),
        onError: errorResponse => {
            console.log(errorResponse);
        }
    })

    const handleGoogleScopeAuthorization = (codeResponse: CodeResponse) => {

        authorizeSpaceGoogleApi(codeResponse, spaceInfo.id)
            .then((response: string) => {
                addAlert({type: "success", message: response})
            })
            .catch((error: ErrorResponse) => {
                if (error.status !== 500) {
                    addAlert({type: "error", message: error.message})
                }
                console.log(error);

            })

        console.log(codeResponse)
    }


    const reauthorizingInfo = "Space already has drive account authorized, but you can reauthorize it in case authorization expired. This happens when account haven't been used by application for a long time. If file upload doesn't work, please try reauthorizing account.";
    return (
        <Dialog fullWidth open={props.open}>
            <Paper sx={{flexGrow: 1, padding: 2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stack spacing={0.5} direction={"row"}>
                            <TextField fullWidth size={"small"} label="Invitation link" variant="outlined"
                                       onChange={(event) => event}
                                       value={`${process.env.REACT_APP_FRONTEND_ADDRESS}/join/${spaceInfo.invitationHash}`}></TextField>
                            <Button onClick={copyInvitationHash}>Copy</Button>
                            <Button onClick={generateNewInvitationHash}>New</Button>
                        </Stack>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth size={"small"} label="Space Name" variant="outlined"
                                   onChange={(event) => {
                                       setSpaceInfo({...spaceInfo, name: event.currentTarget.value});
                                   }}
                                   value={spaceInfo.name}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1} direction={"row"}>
                            <Typography typography={"subtitle1"}>Active:</Typography>
                            <Button variant={"outlined"} size={"small"} onClick={() => setSpaceInfo({
                                ...spaceInfo,
                                isActive: !spaceInfo.isActive
                            })}>{spaceInfo.isActive ? "Yes" : "No"}</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <TagAdder spaceTags={spaceInfo.allowedTags}
                                  setSpaceTags={(addedTags) => setSpaceInfo({...spaceInfo, allowedTags: addedTags})}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            sx={{textTransform: "none"}}
                            onClick={authorizeGoogleScope}
                            startIcon={<AddToDriveOutlinedIcon/>}>
                            {spaceInfo.hasGoogleDriveConfigured ? "Reauthorize Google Drive account " + spaceInfo.googleDriveAccountEmail : "Authorize Google Drive account for space"}
                        </Button>
                        {spaceInfo.hasGoogleDriveConfigured &&
                            <Tooltip title={spaceInfo.hasGoogleDriveConfigured ? reauthorizingInfo : null}>
                                <HelpCenterIcon sx={{p: 0.1}} fontSize={"medium"}></HelpCenterIcon>
                            </Tooltip>
                        }
                    </Grid>

                </Grid>
                <Stack direction={"row"} sx={{mt: 2}}>
                    <Box sx={{flexGrow: 1}}></Box>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </Stack>
                <AlertStack alerts={alerts} setAlerts={setAlerts}></AlertStack>
            </Paper>
        </Dialog>


    );
}
