import {useParams} from "react-router-dom";
import {EcapsBar} from "../components/EcapsBar";
import {useEffect, useState} from "react";
import {Box, Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store";
import {joinSpace} from "../fetch/SpaceControllerFetches";
import {SpaceInfoDto} from "../model/SpaceInfoDto";


export const JoinPage = () => {
    const {invitationHash} = useParams();
    const userEmail = useSelector((root: RootState) => root.UserSlice.parsedUserToken?.email);
    const [isJoining, setIsJoining] = useState(true);
    const [joinResultMsg, setJoinResultMsg] = useState("");

    useEffect(() => {
        if(!invitationHash) return;
        joinSpace(invitationHash)
            .then((s:SpaceInfoDto) => {
                setJoinResultMsg("Congratulations, you have joined space " + s.name)
            })
            .catch((error: Error) => {
                setJoinResultMsg(error.message)
            })
            .finally(() => {
                setIsJoining(false);
            })
    }, [invitationHash]);


    return (
        <div><EcapsBar showMySpaces={true}/>
            {
                <Container maxWidth={"md"}>
                    <Box sx={{m: 2}}>
                        {isJoining ?
                            <Typography sx={{textAlign: "center"}} typography={"h3"}>Joining . . .</Typography>
                            :
                            <Typography sx={{textAlign: "center"}} typography={"h4"}>{joinResultMsg}</Typography>
                        }
                    </Box>
                </Container>
            }
        </div>
    );
}