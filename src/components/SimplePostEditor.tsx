import {Box, Button, Divider, Stack, Tab, Tabs, TextareaAutosize, Typography} from "@mui/material";
import React, {SyntheticEvent, useState} from "react";
import TextArea from "@uiw/react-md-editor/lib/components/TextArea";
import MuiMarkdown from "mui-markdown";
import {Post} from "./Post";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store";
import {EcapsUserDto} from "../model/EcapsUserDto";
import {EcapsTag} from "../model/EcapsTag";
import {GoogleAttachment} from "../model/GoogleAttachment";
import {TagChooser} from "./TagChooser";
import {createPost} from "../fetch/PostControllerFetches";
import {PostDto} from "../model/PostDto";


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


    let createdOn = new Date(Date.now()).toJSON();
    let send;
    if (props.mode === "newpost") {
        send = () => {
            //TODO check if content and selected tags arent empty, if so - show some <Alert/>

            createPost({spaceId: props.spaceId, tags: selectedTags, content: content})
                .then(res => {
                    //TODO: handle another HTTP RESPONSES LIKE 400
                    console.log(res.id)
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

    const getPostInfo = (): PostDto =>{
        return {
            id: 0,
            author: author,
            content: content,
            createdOn: createdOn,
            tags: selectedTags,
            googleAttachments: attachments
        }
    }


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
            </TabPanel>
            <TabPanel index={1} value={selectedTab}>
                <Post postInfo={getPostInfo()} editable={false} commentable={false}/>
            </TabPanel>
            <Stack sx={{m: 1}} direction={"row"}><Box sx={{flexGrow: 1}}/><Button onClick={send}>Create
                post</Button></Stack>
        </Box>
    );
}