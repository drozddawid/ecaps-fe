import {Avatar, Box, Button, Chip, Container, Divider, Paper, Stack, Tooltip, Typography} from "@mui/material";
import MuiMarkdown from "mui-markdown";
import {PostDto} from "../model/PostDto";
import {PostComments} from "./PostComments";
import {NewComment} from "./NewComment";
import React, {useState} from "react";
import {AddCommentRounded} from "@mui/icons-material";
import {CommentDto} from "../model/CommentDto";

export const Post =
    (props: {
        postInfo: PostDto,
        editable: boolean,
        commentable: boolean
    }) => {
        //TODO make post not editable if editalbe is false
        let createdOn = props.postInfo.createdOn
        const [commentMode, setCommentMode] = useState(false);
        const [comments, setComments] = useState<CommentDto[]>([])

        return (
            <Paper sx={{mt: 2}}>
                <Stack
                    divider={<Divider/>}
                    sx={{m: 0.5}}
                >
                    <Stack direction={"row"} sx={{overflowY: "auto", maxHeight: "80px"}}>
                        <Box sx={{p: 1, flexGrow: 1}}>
                            {
                                props.postInfo.tags.map((tag) => {
                                    return (
                                        <Chip key={tag.id} sx={{mx: 0.2}} size={"small"} label={tag.name}/>
                                    );
                                })
                            }
                        </Box>
                        <Box sx={{p: 1}}>
                            <Tooltip title={
                                <Stack>
                                    <Typography sx={{mt: 1}}
                                                typography={"caption"}>{props.postInfo.author.email}</Typography>
                                    <Typography sx={{mt: 1}}
                                                typography={"caption"}>{createdOn.replace("T", " ").substring(0, createdOn.lastIndexOf(":"))}</Typography>
                                </Stack>
                            } placement={"right"}>
                                <Stack direction={"row"}>
                                    <Avatar sx={{height: "20px", width: "20px", m: 1}}
                                            src={props.postInfo.author.pictureURL}
                                            alt={props.postInfo.author.name}/>
                                    <Typography sx={{mt: 1}} typography={"subtitle2"}>{props.postInfo.author.name}</Typography>
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
                        >{props.postInfo.content}</MuiMarkdown>
                    </Box>
                    <Box sx={{my: 1}}>
                        <PostComments postId={props.postInfo.id} comments={comments} setComments={setComments}></PostComments>
                    </Box>
                    <Box sx={{mt: 1}}>
                        <Container maxWidth={"xl"}>
                            {props.commentable ?
                                commentMode ?
                                    <NewComment comments={comments} setComments={setComments} minLines={3} postId={props.postInfo.id}></NewComment>
                                    :
                                    <Button startIcon={<AddCommentRounded/>} sx={{m: 0.5}} size={"small"}
                                            onClick={() => setCommentMode(true)}>Comment</Button>
                                :
                                null
                            }
                        </Container>
                    </Box>
                </Stack>


            </Paper>
        );
    }