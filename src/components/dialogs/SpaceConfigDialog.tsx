import {Box, Button, Container, Dialog, Grid, Paper, Stack, Switch, TextField, Typography} from "@mui/material";
import {SpaceInfoDto} from "../../model/SpaceInfoDto";
import {generateNewSpaceInvitationHash} from "../../fetch/SpaceControllerFetches";
import {useState} from "react";
import {Form, Formik} from "formik";


export const SpaceConfigDialog = (
    props: {
        open: boolean,
        setOpen: (isOpen: boolean) => void,
        spaceInfo: SpaceInfoDto
    }
) => {
    const [spaceInfo, setSpaceInfo] = useState(props.spaceInfo);

    const handleClose = () => {
        props.setOpen(false);
    }
    const handleSave = () => {

    }
    const copyInvitationHash = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_FRONTEND_ADDRESS}/join/${props.spaceInfo.invitationHash}`)
            .catch((e: Error) => console.log(e.message));
    }

    const generateNewInvitationHash = () => {
        generateNewSpaceInvitationHash(props.spaceInfo.id)
            .then((spaceInfo: SpaceInfoDto) => {
                setSpaceInfo(spaceInfo);
            })
            .catch((error: Error) => {
                console.log(error.message);
            })
    }


    return (
        <Dialog fullWidth open={props.open}>
            <Paper sx={{flexGrow: 1, padding: 2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth size={"small"} label="Invitation link" variant="outlined"
                                   onChange={(event) => event}
                                   value={`${process.env.REACT_APP_FRONTEND_ADDRESS}/join/${spaceInfo.invitationHash}`}></TextField>
                        <Button onClick={copyInvitationHash}>Copy</Button>
                        <Button onClick={generateNewInvitationHash}>New</Button>
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

                </Grid>
                <Stack direction={"row"} sx={{mt:2}}>
                    <Box sx={{flexGrow:1}}></Box>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type={"submit"}>Save</Button>
                </Stack>
            </Paper>
        </Dialog>


    );
}
