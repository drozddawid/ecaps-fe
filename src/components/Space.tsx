import {Divider, Grid, Paper, Tooltip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SpaceInfoDto} from "../model/SpaceInfoDto";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store";

export const Space =
    (props: SpaceInfoDto) => {
        const theme = useSelector((root: RootState) => root.ThemeSlice.theme);
        const onHoverColor = theme === "light"? "#ffffff" : "#000000";
        const navigate = useNavigate();
        return (
            <Grid item xs={4}>
                <Tooltip title={props.isActive ? null : "Space is inactive."}>
                    <Paper
                        onClick={props.isActive ? () => {
                            navigate("/spaces/" + props.spaceHash)
                        } : () => {
                        }}
                        sx={{
                            background: "primary",
                            "&:hover": {
                                background: onHoverColor
                            },
                            paddingTop: 2, paddingBottom: 2
                        }}
                    >
                        <Divider variant={"middle"}/>
                        <Typography typography={"h8"} marginX={2} color={props.isActive? "text.primary" : "text.disabled"}>{props.name}</Typography>
                        <Divider variant={"middle"}/>
                    </Paper>
                </Tooltip>
            </Grid>
        );
    }