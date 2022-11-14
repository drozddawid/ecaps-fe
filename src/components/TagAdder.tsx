import {Box, Button, Chip, InputAdornment, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {EcapsTag} from "../model/EcapsTag";
import React, {useState} from "react";


export const TagAdder = (
    props: {
        spaceTags: EcapsTag[],
        setSpaceTags: (addedTags: EcapsTag[]) => void
    }
) => {
    const [removedTags, setRemovedTags] = useState<EcapsTag[]>([]);
    const [addedTags, setAddedTags] = useState<EcapsTag[]>([]);

    return (
        <Stack direction={"column"}>
            <Stack direction={'row'}>
                <Tooltip
                    placement={"left-start"}
                    title={"Note that tags with existing posts won't be removed."}>
                    <Typography typography={"subtitle1"}>Allowed tags:</Typography>
                </Tooltip>
                <Box sx={{flexGrow: 1}}/>
                <Button onClick={() => {
                    props.setSpaceTags(props.spaceTags.filter(t => !addedTags.some(tg => tg.name === t.name)).concat(removedTags))
                    setRemovedTags([]);
                    setAddedTags([])
                }}>Reset tags</Button>
            </Stack>

            <Box sx={{mb: 1.5}}>
                {props.spaceTags
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(t => {
                        return (
                            <Chip key={t.name}
                                  clickable
                                  sx={{mx: 0.2}} size={"small"}
                                  label={t.name}
                                  onClick={event => {
                                      if (!addedTags.some(et => et.name === t.name)) {
                                          setRemovedTags(removedTags.concat(t))
                                      }
                                      props.setSpaceTags(props.spaceTags.filter(tg => tg.name !== t.name))
                                  }}
                            ></Chip>
                        )
                    })
                }
            </Box>
            {
                <TextField
                    fullWidth size={"small"} label="Add tag" variant="outlined"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">#</InputAdornment>,
                        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                            if ((e.key) === 'Enter') {
                                // @ts-ignore
                                let tag = e.target.value;
                                if (tag.length > 0 && !addedTags.some(tg => tg.name === tag) && !props.spaceTags.some(tg => tg.name === tag)) {
                                    setAddedTags(addedTags.concat({id: 0, name: tag}));
                                    props.setSpaceTags(props.spaceTags.concat({id: 0, name: tag}));
                                }
                                // @ts-ignore
                                e.target.value = ""
                            }
                        }
                    }}
                ></TextField>
            }
        </Stack>
    );
}