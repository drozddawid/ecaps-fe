import {EcapsTag} from "./EcapsTag";

export interface SpaceInfoDto {
    id: number,
    name: string,
    isActive: boolean,
    createdOn: Date,
    hasGoogleDriveConfigured: boolean,
    googleDriveApiKey: string,
    invitationHash: string,
    spaceHash: string,
    allowedTags: EcapsTag[];
}