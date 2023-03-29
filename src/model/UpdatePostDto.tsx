import {CreatePostDto} from "./CreatePostDto";
import {GoogleAttachment} from "./GoogleAttachment";

export interface UpdatePostDto extends CreatePostDto{
    postId: number,
    googleAttachments: GoogleAttachment[]
}