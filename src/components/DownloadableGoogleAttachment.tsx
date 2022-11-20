import {GoogleAttachment} from "../model/GoogleAttachment";
import {Chip} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import {downloadPostAttachment} from "../fetch/SpaceControllerFetches";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useState} from "react";

function saveFileFromBlob(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
}

export const DownloadableGoogleAttachment = (
    props: {
        postId: number,
        attachment: GoogleAttachment,
        isDownloadable: boolean
    }) => {
    const [label, setLabel] = useState(props.attachment.fileName);
    const onDownload = () => {
        setLabel("Downloading ...");
        downloadPostAttachment(props.attachment.googleDriveId, props.postId)
            .then((blob) =>{
                saveFileFromBlob(blob, props.attachment.fileName);
                setLabel(props.attachment.fileName);
            })
            .catch((error) => {
                setLabel("Failed to download.");
                setTimeout(() => setLabel(props.attachment.fileName), 4000);
                console.log(error);
            })
    }

    return (
        <Chip sx={{m:0.5}} size={"small"} icon={<DownloadIcon/>} clickable onClick={props.isDownloadable? onDownload : undefined} label={label}></Chip>
    );
}