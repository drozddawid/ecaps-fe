import {EcapsTag} from "./EcapsTag";

export interface SpaceInfoDto {
    id: number,
    name: string,
    isActive: boolean,
    createdOn: Date,
    hasGoogleDriveConfigured: boolean,
    googleDriveAccountEmail: string,
    invitationHash: string,
    spaceHash: string,
    allowedTags: EcapsTag[];
}