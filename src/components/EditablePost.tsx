import {useState} from "react";
import {PostDto} from "../model/PostDto";
import {Post} from "./Post";
import {Paper, Typography} from "@mui/material";
import {SimplePostEditor} from "./SimplePostEditor";
import {SpaceInfoDto} from "../model/SpaceInfoDto";


export const EditablePost = (
    props: {
        spaceInfo: SpaceInfoDto,
        postInfo: PostDto,
        editable: boolean
        setPostInfoAfterUpload: (post: PostDto) => void
        onDelete: (postId: number) => void
    }
) => {
    const [editMode, setEditMode] = useState(false);


    return (
        editMode ?
            <Paper sx={{mt: 2}}>
                <SimplePostEditor spaceId={props.spaceInfo.id}
                                  allowedTags={props.spaceInfo.allowedTags}
                                  minLines={20}
                                  mode={"editpost"}
                                  onClose={() => setEditMode(false)}
                                  hasGoogleDriveConfigured={props.spaceInfo.hasGoogleDriveConfigured}
                                  initialPost={props.postInfo}
                                  setPostInfoAfterUpload={props.setPostInfoAfterUpload}
                />
            </Paper>
            :
            <Post postInfo={props.postInfo} onEdit={props.editable ? () => setEditMode(true) : undefined}
                  onDelete={props.editable? props.onDelete : undefined}
                  commentable={true}/>

    );
}