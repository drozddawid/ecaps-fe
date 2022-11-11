import {Chip} from "@mui/material";
import {EcapsTag} from "../model/EcapsTag";


export const PostTag = (onClick: ()=>void, tag:EcapsTag) => {
    return (
        <Chip sx={{m: 0.2, p: 0.1}} label={tag.name}/>
    );
}