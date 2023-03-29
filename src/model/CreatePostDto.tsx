import {EcapsTag} from "./EcapsTag";

export interface CreatePostDto{
    content: string,
    spaceId: number,
    tags: EcapsTag[]
}