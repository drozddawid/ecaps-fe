import {Avatar, Box, Chip, Divider, Paper, Stack, Tooltip, Typography} from "@mui/material";
import MuiMarkdown from "mui-markdown";
import {PostDto} from "../model/PostDto";

export const Post =
    (postInfo: PostDto, editable:boolean) => {
    //TODO make post not editable if editalbe is false
        let createdOn = postInfo.createdOn
        // const overrides = {h1: {component: "h1"}};
        return (
            <Paper sx={{mt: 2}}>
                <Stack
                    divider={<Divider/>}
                    sx={{m: 0.5}}
                >
                    <Stack direction={"row"} sx={{overflowY: "auto", maxHeight: "80px"}}>
                        <Box sx={{p: 1, flexGrow: 1}}>
                            {
                                postInfo.tags.map((tag) => {
                                    return (
                                        <Chip key={tag.id} sx={{m: 0.2, p: 0.1}} label={tag.name}/>
                                    );
                                })
                            }
                        </Box>
                        <Box sx={{p: 1}}>
                            <Tooltip title={
                                <Stack>
                                    <Typography sx={{mt: 1}} typography={"caption"}>{postInfo.author.email}</Typography>
                                    <Typography sx={{mt: 1}} typography={"caption"}>{createdOn.replace("T", " ").substring(0, createdOn.lastIndexOf(":"))}</Typography>
                                </Stack>
                            } placement={"right"}>
                                <Stack direction={"row"}>
                                    <Avatar sx={{height: "3vh", width: "3vh", m: 1}} src={postInfo.author.pictureURL}
                                            alt={postInfo.author.name}/>
                                    <Typography sx={{mt: 1}} typography={"h7"}>{postInfo.author.name}</Typography>
                                </Stack>
                            </Tooltip>
                        </Box>
                    </Stack>
                    <Box sx={{p: 1, wordBreak: "break-word"}}>
                        <MuiMarkdown overrides={{
                            h1: {component: 'h1'},
                            h2: {component: 'h2'},
                            h3: {component: 'h3'},
                            h4: {component: 'h4'},
                            h5: {component: 'h5'},
                            h6: {component: 'h6'},
                        }}
                        >{postInfo.content}</MuiMarkdown>
                    </Box>
                </Stack>
            </Paper>
        );
    }