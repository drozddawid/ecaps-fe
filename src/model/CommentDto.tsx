import {EcapsUserDto} from "./EcapsUserDto";
import {GoogleAttachment} from "./GoogleAttachment";

export interface CommentDto{
    id: number
    createdOn: string,
    author: EcapsUserDto,
    content: string,
    attachments: GoogleAttachment[]
}