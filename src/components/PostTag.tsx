import {Chip} from "@mui/material";
import {EcapsTag} from "../model/EcapsTag";


export const PostTag = (onClick: ()=>void, tag:EcapsTag) => {
    return (
        <Chip sx={{mx: 0.2}} size={"small"} label={tag.name}/>
    );
}