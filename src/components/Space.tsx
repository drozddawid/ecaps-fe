import {Divider, Grid, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const Space =
    (props: {
        spaceId: number,
        spaceName: string,
        spaceHash: string,
        createdAt: string,
    }) => {
        const navigate = useNavigate();
        return (
            <Grid item xs={4}>
                <Paper
                    onClick={() => {navigate("/spaces/" + props.spaceHash)}}
                    sx={{
                        background: "primary",
                        "&:hover": {
                            background: "#000000"
                        },
                        paddingTop: 2, paddingBottom: 2}}
                >
                    <Divider variant={"middle"}/>
                    <Typography typography={"h8"} marginX={2}>{props.spaceName}</Typography>
                    <Divider variant={"middle"}/>
                </Paper>
            </Grid>
        );
    }