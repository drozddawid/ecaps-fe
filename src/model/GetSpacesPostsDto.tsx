import {EcapsTag} from "./EcapsTag";

export interface GetSpacesPostsDto {
    spaceId: number,
    pageNumber: number,
    pageSize: number
}

export interface GetSpacePostsFilteredByTagsDto extends  GetSpacesPostsDto{
    tags: EcapsTag[]
}