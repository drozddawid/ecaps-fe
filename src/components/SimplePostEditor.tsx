import {Box, Button, Divider, Stack, Tab, Tabs, TextareaAutosize} from "@mui/material";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {Post} from "./Post";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store";
import {EcapsUserDto} from "../model/EcapsUserDto";
import {EcapsTag} from "../model/EcapsTag";
import {GoogleAttachment} from "../model/GoogleAttachment";
import {TagChooser} from "./TagChooser";
import {createPost, updatePost, uploadPostAttachment} from "../fetch/PostControllerFetches";
import {PostDto} from "../model/PostDto";
import {FileChooser} from "./FileChooser";


export const TabPanel = (props: { children?: React.ReactNode, index: number, value: number }) => {
    return (
        <div
            hidden={props.value !== props.index}
        >
            {props.value === props.index && (
                <Box>
                    {props.children}
                </Box>
            )}
        </div>
    );
}


export const SimplePostEditor = (
    props: {
        spaceId: number,
        allowedTags: EcapsTag[],
        minLines: number,
        mode: "newpost" | "editpost"
        onSentPost?: (post: PostDto) => void,
        onClose?: () => void,
        hasGoogleDriveConfigured: boolean
        initialPost?: PostDto,
        setPostInfoAfterUpload?: (post: PostDto) => void
    }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const user = useSelector((state: RootState) => state.UserSlice.parsedUserToken);
    const author: EcapsUserDto = {
        name: user?.name || "User",
        pictureURL: user?.picture || "",
        createdOn: new Date(Date.now()),
        email: user?.email || "",
        id: -1
    }
    const [content, setContent] = useState(props.initialPost?.content || "");
    const [selectedTags, setSelectedTags] = useState<EcapsTag[]>(props.initialPost?.tags || []);
    const [attachments, setAttachments] = useState<GoogleAttachment[]>(props.initialPost?.googleAttachments || []);
    const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
    const [isSending, setIsSending] = useState(false);
    let createdOn = new Date(Date.now()).toJSON();
    let send;
    if (props.mode === "newpost") {
        send = () => {
            //TODO check if content and selected tags arent empty, if so - show some <Alert/>
            setIsSending(true);
            createPost({spaceId: props.spaceId, tags: selectedTags, content: content})
                .then(async res => {
                    //TODO: handle another HTTP RESPONSES LIKE 400
                    if (filesToUpload.length > 0) {
                        console.log("uploading attachments");
                        let attachments = new FormData();
                        filesToUpload.forEach((file) => {
                            attachments.append("files", file, file.name)
                        })
                        await uploadPostAttachment(attachments, res.id)
                            .then(r => console.log(r))
                            .catch(e => console.log(e));

                    }
                    setIsSending(false);
                    props.onSentPost && props.onSentPost(res)
                })
                .catch(error => console.log(error))
        }
    }

    if (props.mode === "editpost") {
        send = () => {
            setIsSending(true);
            updatePost({
                postId: props.initialPost?.id || 0,
                content: content,
                tags: selectedTags,
                googleAttachments: attachments,
                spaceId: props.spaceId
            })
                .then(async (updatedPost: PostDto) => {
                    if (filesToUpload.length > 0) {
                        console.log("uploading attachments");
                        let attachments = new FormData();
                        filesToUpload.forEach((file) => {
                            attachments.append("files", file, file.name)
                        })

                        await uploadPostAttachment(attachments, updatedPost.id)
                            .then((resp: PostDto) => {
                                props.setPostInfoAfterUpload && props.setPostInfoAfterUpload(resp);
                                setIsSending(false);
                                props.onClose && props.onClose();
                            })
                            .catch(e => {
                                setIsSending(false)
                                console.log(e)
                            });
                    } else {
                        props.setPostInfoAfterUpload && props.setPostInfoAfterUpload(updatedPost);
                        setIsSending(false);
                        props.onClose && props.onClose();
                    }

                })
                .catch(e => setIsSending(false));
        }
    }

    const getPostInfoForPreview = (): PostDto => {
        return {
            id: 0,
            author: author,
            content: content,
            createdOn: createdOn,
            tags: selectedTags,
            googleAttachments: attachments.concat(getAttachmentsFromFilesToUpload)
        }
    }

    const getAttachmentsFromFilesToUpload: GoogleAttachment[] = filesToUpload.map((f, i) => {
        return {googleDriveId: i.toString(), fileName: f.name}
    })

    return (
        <Box>
            <TagChooser selectedTags={selectedTags} setSelectedTags={setSelectedTags} allowedTags={props.allowedTags}/>
            <Divider/>
            <Tabs
                value={selectedTab}
                onChange={(event: SyntheticEvent<Element, Event>, value: any) => setSelectedTab(value)}>
                <Tab sx={{fontSize: "small"}} label={"Raw"}/>
                <Tab label={"Preview"}/>
            </Tabs>
            <TabPanel index={0} value={selectedTab}>
                <TextareaAutosize style={{width: "100%", height: "100%", marginBottom:0}} minRows={props.minLines}
                                  value={content}
                                  onChange={(event) => setContent(event.currentTarget.value)}></TextareaAutosize>
            </TabPanel>
            <TabPanel index={1} value={selectedTab}>
                <Post postInfo={getPostInfoForPreview()} commentable={false}/>
            </TabPanel>
            {props.hasGoogleDriveConfigured &&
                <FileChooser files={filesToUpload} setFiles={setFilesToUpload} googleAttachments={attachments}
                             setGoogleAttachments={setAttachments}/>
            }
            <Divider sx={{mt: 1}}/>
            <Stack sx={{m: 1}} direction={"row"}>
                <Box sx={{flexGrow: 1}}/>
                {isSending ?
                    <Button>
                        Sending...
                    </Button>
                    :
                    <>{props.onClose &&
                        <Button onClick={props.onClose}>Close</Button>
                    }
                        <Button onClick={send}>
                            {props.mode === "editpost" ? "Apply" : "Create post"}
                        </Button></>
                }
            </Stack>
        </Box>
    );
}