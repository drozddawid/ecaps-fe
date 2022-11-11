import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/Store";
import {Box, Container, Grid, Typography} from "@mui/material";
import {EcapsBar} from "../../components/EcapsBar";
import {Space} from "../../components/Space";
import {NewSpaceDialog} from "../../components/dialogs/NewSpaceDialog";
import {getUserSpaces} from "../../fetch/SpaceControllerFetches";
import {SpaceInfoDto} from "../../model/SpaceInfoDto";

const HomePage = () => {
    const userToken = useSelector((state: RootState) => state.UserSlice.parsedUserToken);
    const dispatch = useDispatch();
    const [showCreateSpaceDialog, setShowCreateSpaceDialog] = useState(false);
    const [userSpaces, setUserSpaces] = useState<SpaceInfoDto[]>([])
    const onCreateNewSpaceClick = () => {
        setShowCreateSpaceDialog(true);
    }
    const onSubmitCreateSpaceDialog = (spaceName: string) => {
        setShowCreateSpaceDialog(false);
    }

    useEffect(() => {
        getUserSpaces()
            .then((spaces: SpaceInfoDto[]) => setUserSpaces(spaces))
            .catch((error: Error) => console.log(error.message));
    }, [showCreateSpaceDialog])

    return (
        <div>
            <EcapsBar showMySpaces={false} createSpaceClickAction={onCreateNewSpaceClick}/>
            <Container maxWidth="md">
                <Box paddingTop={"2vh"}>
                    <Typography paddingBottom={"2vh"} textAlign={"center"} typography={"h4"}>Your spaces</Typography>
                    <Grid container spacing={3}>
                        {userSpaces.map((space) => {
                            return (
                                <Space key={space.id} {...space}></Space>
                            );
                        })}
                    </Grid>
                </Box>
            </Container>
            <NewSpaceDialog isOpen={showCreateSpaceDialog} setOpen={setShowCreateSpaceDialog}></NewSpaceDialog>
        </div>
    );
}


export {HomePage};