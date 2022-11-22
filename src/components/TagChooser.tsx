import {EcapsTag} from "../model/EcapsTag";
import React, {useState} from "react";
import {Autocomplete, Box, Chip, Divider, TextField, Tooltip, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
export const TagChooser = (
    props: {
        selectedTags: EcapsTag[],
        setSelectedTags: React.Dispatch<React.SetStateAction<EcapsTag[]>>,
        allowedTags: EcapsTag[]
    }
) => {


    return (
        <Box>
            <Tooltip title={"Available tags"} placement={"left-start"}>
                <Box sx={{
                    p: 1,
                    flexGrow: 1,
                    maxHeight: "10vh",
                    overflowY: "auto",
                    overscrollBehavior: "auto"
                }}>
                    {
                        props.allowedTags
                            .filter(t => !props.selectedTags.some(tg => tg.name === t.name))
                            .map((t) => {
                                const tag = t;
                                return (
                                    <Chip
                                        deleteIcon={<AddCircleIcon/>}
                                        key={t.id}
                                        clickable={!props.selectedTags.some(tg => tg.name === tag.name)}
                                        sx={{mx: 0.2}}
                                        size={"small"}
                                        label={t.name}
                                        onClick={event => {
                                            if (!props.selectedTags.some(tg => tg.name === tag.name)) props.setSelectedTags(props.selectedTags.concat(t))
                                        }}
                                        onDelete={event => {
                                            if (!props.selectedTags.some(tg => tg.name === tag.name)) props.setSelectedTags(props.selectedTags.concat(t))
                                        }}
                                    />
                                );
                            })
                    }
                </Box>
            </Tooltip>
            <Divider/>
            {props.selectedTags.length === 0 ?
                <Tooltip placement={"left-start"} title={"Please select tags from above."}>
                    <Typography typography={"body1"} sx={{textAlign: "left", ml: 1}}>Selected tags will appear
                        here.</Typography>
                </Tooltip>
                :
                <Tooltip title={"Selected tags"} placement={"left-start"}>
                    <Box>
                        <Box sx={{
                            p: 1,
                            flexGrow: 1,
                            minHeight: "50px",
                            maxHeight: "10vh",
                            overflowY: "auto",
                            overscrollBehavior: "auto"
                        }}>
                            {
                                props.selectedTags
                                    .map((t) => {
                                        const tag = t;
                                        return (
                                            <Chip
                                                deleteIcon={<Delete/>}
                                                key={t.id}
                                                sx={{mx: 0.2}}
                                                size={"small"}
                                                label={t.name}
                                                onClick={event => props.setSelectedTags(props.selectedTags.filter(tg => tg.name !== t.name))}
                                                onDelete={event => props.setSelectedTags(props.selectedTags.filter(tg => tg.name !== t.name))}
                                            />
                                        );
                                    })
                            }
                        </Box>
                    </Box>
                </Tooltip>
            }
        </Box>
    );
}