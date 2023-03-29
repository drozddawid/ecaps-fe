import {EcapsUserDto} from "./EcapsUserDto";
import {EcapsTag} from "./EcapsTag";
import {GoogleAttachment} from "./GoogleAttachment";


export interface PostDto {
    id: number,
    content: string,
    createdOn: string,
    author: EcapsUserDto,
    tags: EcapsTag[]
    googleAttachments: GoogleAttachment[]
}