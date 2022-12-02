import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Divider,
    Paper,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import MuiMarkdown from "mui-markdown";
import {PostDto} from "../model/PostDto";
import {PostComments} from "./PostComments";
import {NewComment} from "./NewComment";
import React, {useState} from "react";
import {AddCommentRounded, Delete} from "@mui/icons-material";
import {CommentDto} from "../model/CommentDto";
import {DownloadableGoogleAttachment} from "./DownloadableGoogleAttachment";
import EditIcon from '@mui/icons-material/Edit';
import {deletePost} from "../fetch/PostControllerFetches";
import {ErrorResponse} from "../fetch/ResponseHandler";

export const Post =
    (props: {
        postInfo: PostDto,
        commentable: boolean
        onEdit?: () => void
        onDelete?: (postId: number) => void
    }) => {
        let createdOn = props.postInfo.createdOn
        const [commentMode, setCommentMode] = useState(false);
        const [comments, setComments] = useState<CommentDto[]>([])
        const [showDeleteDialog, setShowDeleteDialog] = useState(false);
        const onDelete = () => {
            deletePost(props.postInfo.id)
                .then((resp:string) => {
                    props.onDelete && props.onDelete(props.postInfo.id)
                    setShowDeleteDialog(false);
                })
                .catch((e : ErrorResponse) => {
                    console.log(e);
                    setShowDeleteDialog(false);
                })


        }
        return (
            <Paper sx={{mt: 2, border:props.commentable? 0 : 1}}>

                <Dialog open={showDeleteDialog}>
                    <DialogTitle>{"Do you really want to delete the post?"}</DialogTitle>
                    <DialogContent>{"Be careful, this action can't be undone."}</DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDeleteDialog(false)} sx={{color:"green"}}>No, take me back</Button>
                        <Button onClick={onDelete} endIcon={<Delete/>} sx={{color:"red"}}>Yes</Button>
                    </DialogActions>
                </Dialog>

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
                            <Stack direction={"row"}>
                                {props.onEdit &&
                                    <Tooltip title={"Edit post"}>
                                        <EditIcon sx={{mt: 0.7}} fontSize={"small"} onClick={props.onEdit}/>
                                    </Tooltip>
                                }
                                {props.onEdit &&
                                    <Tooltip title={"Delete post"}>
                                    <Delete sx={{mt: 0.7}} fontSize={"small"}
                                            onClick={() => setShowDeleteDialog(true)}/>
                                    </Tooltip>
                                }
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
                                        <Typography sx={{mt: 1}}
                                                    typography={"subtitle2"}>{props.postInfo.author.name}</Typography>
                                    </Stack>
                                </Tooltip>
                            </Stack>
                        </Box>
                    </Stack>
                    <Box sx={{p: 2, wordBreak: "break-word"}}>
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
                    {
                        props.postInfo.googleAttachments.length > 0 &&
                        <Box>
                            {props.postInfo.googleAttachments.map(attachment => {
                                return (<DownloadableGoogleAttachment key={attachment.googleDriveId} postId={props.postInfo.id} attachment={attachment}
                                                                      isDownloadable={props.commentable}/>);
                            })}
                        </Box>
                    }
                    {props.commentable &&
                    <Box sx={{my: 1}}>

                            <PostComments postId={props.postInfo.id} comments={comments}
                                          setComments={setComments}></PostComments>
                    </Box>
                    }
                    <Box sx={{mt: 1}}>
                        <Container maxWidth={"xl"}>
                            {props.commentable ?
                                commentMode ?
                                    <NewComment comments={comments} setComments={setComments} minLines={3}
                                                postId={props.postInfo.id}></NewComment>
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