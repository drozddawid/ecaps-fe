import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/Store";
import {Box, Container, Grid, Typography} from "@mui/material";
import {EcapsBar} from "../../components/EcapsBar";
import {Space} from "../../components/Space";
import {NewSpaceDialog} from "../../components/dialogs/NewSpaceDialog";
import {createSpace} from "../../fetch/SpaceControllerFetches";

const HomePage = () => {
    const userToken = useSelector((state: RootState) => state.UserSlice.parsedUserToken);
    const dispatch = useDispatch();
    const [showCreateSpaceDialog, setShowCreateSpaceDialog] = useState(false);
    const onCreateNewSpaceClick = () => {
        setShowCreateSpaceDialog(true);
    }
    const onSubmitCreateSpaceDialog = (spaceName: string) => {
        setShowCreateSpaceDialog(false);
    }
    return (
        <div>
            <EcapsBar showMySpaces={false} createSpaceClickAction={onCreateNewSpaceClick}/>
            <Container maxWidth="md">
                <Box paddingTop={"2vh"}>
                    <Typography paddingBottom={"2vh"} textAlign={"center"} typography={"h4"}>Your spaces</Typography>
                    <Grid container spacing={3}>
                        <Space spaceId={1}
                               spaceName={"My space very long name have lorem ipsum lele nemem"}
                               createdAt={"2010-01-01"}
                                spaceHash={"fawn1nto3inSFA13oitn"}></Space>
                        <Space spaceId={1}
                               spaceName={"My space very long name have lorem ipsum lele nemem"}
                               createdAt={"2010-01-01"}
                               spaceHash={"fsafasfsa"}></Space>
                    </Grid>
                </Box>
            </Container>
            <NewSpaceDialog isOpen={showCreateSpaceDialog} setOpen={setShowCreateSpaceDialog}></NewSpaceDialog>
        </div>
    );
}


export {HomePage};