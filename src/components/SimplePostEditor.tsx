import {Box, Button, Divider, Stack, Tab, Tabs, TextareaAutosize, Typography} from "@mui/material";
import React, {SyntheticEvent, useEffect, useState} from "react";
import TextArea from "@uiw/react-md-editor/lib/components/TextArea";
import MuiMarkdown from "mui-markdown";
import {Post} from "./Post";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store";
import {EcapsUserDto} from "../model/EcapsUserDto";
import {EcapsTag} from "../model/EcapsTag";
import {GoogleAttachment} from "../model/GoogleAttachment";
import {TagChooser} from "./TagChooser";
import {createPost, uploadPostAttachment} from "../fetch/PostControllerFetches";
import {PostDto} from "../model/PostDto";
import {Form} from "react-router-dom";
import {useForm} from "react-hook-form";
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
        onSentPost?: () => void
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
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState<EcapsTag[]>([]);
    const [attachments, setAttachments] = useState<GoogleAttachment[]>([]);
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
                    console.log(res.id)
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
                    if (props.onSentPost) {
                        props.onSentPost()
                    }
                })
                .catch(error => console.log(error))
        }
    }

    if (props.mode === "editpost") {
        send = () => {

        }
    }

    const getPostInfo = (): PostDto => {
        return {
            id: 0,
            author: author,
            content: content,
            createdOn: createdOn,
            tags: selectedTags,
            googleAttachments: attachments
        }
    }

    useEffect(() => {
        const newAttachments: GoogleAttachment[] = filesToUpload.map((f, i) => {
            return {googleDriveId: i.toString(), fileName: f.name}
        })
        setAttachments(newAttachments);
    }, [filesToUpload])


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
                <TextareaAutosize style={{flexGrow: 1, flex: 1, width: "100%", height: "100%"}} minRows={props.minLines}
                                  value={content}
                                  onChange={(event) => setContent(event.currentTarget.value)}></TextareaAutosize>
                <FileChooser files={filesToUpload} setFiles={setFilesToUpload}/>
            </TabPanel>
            <TabPanel index={1} value={selectedTab}>
                <Post postInfo={getPostInfo()} editable={false} commentable={false}/>
            </TabPanel>
            <Stack sx={{m: 1}} direction={"row"}><Box sx={{flexGrow: 1}}/>
                {isSending?
                    <Button>
                        Sending...
                    </Button>
                    :
                    <Button onClick={send}>
                        Create post
                    </Button>
                }
            </Stack>
        </Box>
    );
}