import {EcapsTag} from "../model/EcapsTag";
import React, {useState} from "react";
import {Autocomplete, Box, Chip, Divider, TextField, Tooltip, Typography} from "@mui/material";


export const TagChooser = (
    props: {
        selectedTags: EcapsTag[],
        setSelectedTags: React.Dispatch<React.SetStateAction<EcapsTag[]>>,
        allowedTags: EcapsTag[]
    }
) => {


    return (
        <Box>
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
                                    key={t.id}
                                    clickable={!props.selectedTags.some(tg => tg.name === tag.name)}
                                      sx={{m: 0.2, p: 0.1}}
                                      label={t.name}
                                      onClick={event => {
                                          if (!props.selectedTags.some(tg => tg.name === tag.name)) props.setSelectedTags(props.selectedTags.concat(t))
                                      }}/>
                            );
                        })
                }
            </Box>
            <Divider/>
            {props.selectedTags.length === 0 ?
                <Tooltip title={"Please select tags from above."}>
                    <Typography typography={"body1"} sx={{textAlign: "left"}}>Selected tags will appear here.</Typography>
                </Tooltip>
                :
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
                                            key={t.id}
                                            clickable
                                              sx={{m: 0.2, p: 0.1}}
                                              label={t.name}
                                              onClick={event => props.setSelectedTags(props.selectedTags.filter(tg => tg.name !== t.name))}/>
                                    );
                                })
                        }
                    </Box>
                </Box>
            }
        </Box>
    );
}