import {Box, Button, Container, Snackbar, Stack, Tab, Tabs, TextareaAutosize} from "@mui/material";
import React, {SyntheticEvent, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store";
import {EcapsUserDto} from "../model/EcapsUserDto";
import {TabPanel} from "./SimplePostEditor";
import {Post} from "./Post";
import {Comment} from "./PostComments";
import {GoogleAttachment} from "../model/GoogleAttachment";
import {AddCommentRounded} from "@mui/icons-material";
import {AlertInfo, AlertStack} from "./AlertStack";
import {addNewComment} from "../fetch/PostControllerFetches";
import {CommentDto} from "../model/CommentDto";


export const NewComment = (
    props:{
        postId: number,
        minLines: number,
        comments: CommentDto[],
        setComments: (comments: CommentDto[]) => void
    }
) => {
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
    const [attachments, setAttachments] = useState<GoogleAttachment[]>([]);
    const [alerts, setAlerts] = useState<AlertInfo[]>([]);

    let createdOn = new Date(Date.now()).toJSON();

    const send = () =>{
        if(content.length < 0){
            addAlert({type: "error", message: "Comment content can't be empty."})
            return;
        }
        addNewComment({content: content, postId: props.postId})
            .then((comment: CommentDto) => {
                props.setComments([comment].concat(props.comments));
                setContent("");
            })
            .catch((error: Error) => {
                addAlert({type: "error", message: error.message})
            })
    }

    const addAlert = (alert: AlertInfo) => {
        if(!alerts.some(a => a.type===alert.type && a.message === alert.message)){
            setAlerts(alerts.concat(alert))
            setTimeout(() => setAlerts(alerts.filter(a => a.type!==alert.type && a.message !== alert.message)), 3000);
        }
    }

    return (
        <Box>
            <Tabs
                sx={{minHeight:"8px"}}
                value={selectedTab}
                onChange={(event: SyntheticEvent<Element, Event>, value: any) => setSelectedTab(value)}>
                <Tab sx={{fontSize: "10pt", minHeight:"8px", p:0.5}} label={"Raw"}/>
                <Tab sx={{fontSize: "10pt", minHeight:"8px", p:0.5}} label={"Preview"}/>
                {/*<Tab label={"Preview"}/>*/}
            </Tabs>
            <TabPanel index={0} value={selectedTab}>
                <TextareaAutosize style={{marginTop:"3px", flexGrow: 1, flex: 1, width: "100%", height: "100%"}} minRows={props.minLines}
                                  value={content}
                                  onChange={(event) => setContent(event.currentTarget.value)}></TextareaAutosize>
            </TabPanel>
            <TabPanel index={1} value={selectedTab}>
                <Comment id={0} createdOn={createdOn} author={author} content={content} attachments={attachments}/>
            </TabPanel>
            <Button startIcon={<AddCommentRounded/>} size={"small"} sx={{m:0.5}} onClick={send}>Send</Button>
            <AlertStack alerts={alerts} setAlerts={setAlerts}></AlertStack>
        </Box>
    );
}