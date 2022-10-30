import {Paper} from "@mui/material";

interface UserInfo{
    picture: string,
    name: string
}

interface Comment{

}


export const Post =
    (props: {
        postId: string,
        userPicture: string,
        userName: string,
        createdAt: string,
        tags: string[],
        content: string,
        comments: Comment[]

    }) => {

        return (
            <Paper>

            </Paper>
        );
    }