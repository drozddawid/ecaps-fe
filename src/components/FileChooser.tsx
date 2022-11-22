import {Box, Button, Chip, Stack, Typography} from "@mui/material";
import React, {ChangeEvent, useRef} from "react";
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import {Delete} from "@mui/icons-material";
import {GoogleAttachment} from "../model/GoogleAttachment";

export const FileChooser = (
    props: {
        files: File[]
        setFiles: (files: File[]) => void,
        googleAttachments?: GoogleAttachment[],
        setGoogleAttachments?: (googleAttachments: GoogleAttachment[]) => void
    }
) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        props.setFiles(props.files
            .concat([...e.target.files].filter(file => !props.files.some(f => f.name === file.name))));
    }


    return (
        <Box>
            <Stack spacing={0.6}>
                <Box>
                    <Button sx={{mt: 1}} startIcon={<AddToDriveIcon/>} onClick={() => inputRef.current?.click()}>Add file</Button>
                </Box>
                <Box>
                    <Stack direction={"row"}>
                        {((props.googleAttachments?.length || 0) > 0 || props.files.length > 0) &&
                            <Typography typography={"subtitle2"}>Added files:</Typography>}
                        <Box>
                            {props.googleAttachments &&
                                props.googleAttachments.map(attachment => {
                                    return (
                                        <Chip key={attachment.googleDriveId} sx={{mx: 0.2}} size={"small"}
                                              label={attachment.fileName}
                                              deleteIcon={<Delete/>}
                                              onDelete={() => {
                                                  if (props.googleAttachments != undefined && props.setGoogleAttachments != undefined) {
                                                      props.setGoogleAttachments(props.googleAttachments.filter(a => a.googleDriveId !== attachment.googleDriveId))
                                                  }
                                              }}/>
                                    );
                                })}
                            {props.files.map(file => {
                                return (
                                    <Chip key={file.name} sx={{mx: 0.2}} size={"small"} label={file.name}
                                          deleteIcon={<Delete/>}
                                          onDelete={() => {
                                              props.setFiles(props.files.filter(f => f.name !== file.name))
                                          }}/>
                                );
                            })}
                        </Box>
                    </Stack>
                </Box>
                <input
                    multiple
                    ref={inputRef}
                    type={"file"}
                    onChange={handleAddFile}
                    style={{display: "none"}}
                />
            </Stack>
        </Box>

    );
}