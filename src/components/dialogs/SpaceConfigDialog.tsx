import {Alert, Box, Button, Container, Dialog, Grid, Paper, Stack, Switch, TextField, Typography} from "@mui/material";
import {SpaceInfoDto} from "../../model/SpaceInfoDto";
import {changeSpaceSettings, generateNewSpaceInvitationHash} from "../../fetch/SpaceControllerFetches";
import React, {useState} from "react";
import {Form, Formik} from "formik";
import {TagChooser} from "../TagChooser";
import {TagAdder} from "../TagAdder";
import {AlertInfo, AlertStack} from "../AlertStack";


export const SpaceConfigDialog = (
    props: {
        open: boolean,
        setOpen: (isOpen: boolean) => void,
        spaceInfo: SpaceInfoDto
        setSpaceInfo: (spaceInfo: SpaceInfoDto) => void
    }
) => {
    const [spaceInfo, setSpaceInfo] = useState(JSON.parse(JSON.stringify(props.spaceInfo)));
    const [alerts, setAlerts] = useState<AlertInfo[]>([]);


    const handleClose = () => {
        props.setOpen(false);
    }
    const handleSave = () => {
        if(spaceInfo.name.length < 1){
            addAlert({type:"warning", message:"Space name can't be blank."})
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
        if(!alerts.some(a => a.type===alert.type && a.message === alert.message)){
            setAlerts(alerts.concat(alert))
            setTimeout(() => setAlerts(alerts.filter(a => a.type!==alert.type && a.message !== alert.message)), 3000);
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
