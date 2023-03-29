import * as React from 'react';
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {Container} from "@mui/material";
import {SimplePostEditor} from "../SimplePostEditor";
import {EcapsTag} from "../../model/EcapsTag";
import {PostDto} from "../../model/PostDto";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

export const NewPostDialog = (
    props: {
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        spaceId: number,
        hasGoogleDriveConfigured: boolean,
        allowedTags: EcapsTag[],
        addPost: (post:PostDto) => void
    }
) => {
    const handleSentPost = (post: PostDto) => {
        props.addPost(post);
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={props.open}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Creating new post
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => props.setOpen(false)}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={"md"}>
                    <SimplePostEditor hasGoogleDriveConfigured={props.hasGoogleDriveConfigured} spaceId={props.spaceId} minLines={20} allowedTags={props.allowedTags} mode={"newpost"} onSentPost={handleSentPost}></SimplePostEditor>
                </Container>
            </Dialog>
        </div>
    );
}