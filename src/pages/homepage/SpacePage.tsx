import {Typography} from "@mui/material";
import {EcapsBar} from "../../components/EcapsBar";
import {useParams} from "react-router-dom";

export const SpacePage = () => {
    const {spaceHash} = useParams();
    return (
        <div>
            <EcapsBar showMySpaces={true}/>
            <Typography>{spaceHash}</Typography>
        </div>
    );
}