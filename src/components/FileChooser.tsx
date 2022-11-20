import {Box, Button, Chip, Stack, Typography} from "@mui/material";
import React, {ChangeEvent, useRef} from "react";
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import {Delete} from "@mui/icons-material";

export const FileChooser = (
    props: {
        files: File[]
        setFiles: (files: File[]) => void,
    }
) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleAddFile = (e: ChangeEvent<HTMLInputElement>) =>{
        if(!e.target.files){
            return;
        }
        props.setFiles(props.files
            .concat([...e.target.files].filter(file => !props.files.some(f => f.name === file.name))));
    }


    return (
        <Box>
            <Stack>
                <Box>
                    {props.files.length > 0 && <Typography typography={"subtitle2"}>Added files:</Typography> }
                    {props.files.map(file => {
                        return (
                            <Chip key={file.name} sx={{mx: 0.2}} size={"small"} label={file.name}
                                  deleteIcon={<Delete/>}
                                  onDelete={()=> {
                                      props.setFiles(props.files.filter(f => f.name !== file.name))
                                  }}/>
                        );
                    })}
                </Box>
                <Box>
                    <Button startIcon={<AddToDriveIcon/>} onClick={() => inputRef.current?.click()}>Add file</Button>
                </Box>
                <input
                    multiple
                    ref={inputRef}
                       type={"file"}
                       onChange={handleAddFile}
                       style={{display:"none"}}
                />
            </Stack>
        </Box>

    );
}