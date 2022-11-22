import {store} from "../store/Store"
import {SpaceInfoDto} from "../model/SpaceInfoDto";
import {EcapsTag} from "../model/EcapsTag";
import {
    handleBlobResponseNoLogoutWhenUnauthorized,
    handleResponseLogoutWhenUnauthorized,
    handleResponseNoLogoutWhenUnauthorized
} from "./ResponseHandler";

export const createSpace = async (spaceName: string): Promise<SpaceInfoDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/spaces`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'text/plain'
        },
        body: spaceName
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((spaceInfo: SpaceInfoDto) => spaceInfo);
};


export const getUserSpaces = async (): Promise<SpaceInfoDto[]> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/spaces/my`;

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + userToken,
        }
    };
    return await fetch(url, requestOptions)
        .then(handleResponseLogoutWhenUnauthorized)
        .then((spaceInfo: SpaceInfoDto[]) => spaceInfo);
};

export const getSpaceInfo = async (spaceHash: string): Promise<SpaceInfoDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/spaces/info?spaceHash=` + spaceHash;

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((spaceInfo: SpaceInfoDto) => spaceInfo);
};

export const joinSpace = async (invitationHash: string): Promise<SpaceInfoDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/spaces/join`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'text/plain'
        },
        body: invitationHash
    };
    return await fetch(url, requestOptions)
        .then(handleResponseLogoutWhenUnauthorized)
        .then((resp: SpaceInfoDto) => resp)
};

export const getSpacesManagedByUser = async (): Promise<SpaceInfoDto[]> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/spaces/managed`;

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((spaceInfo: SpaceInfoDto[]) => spaceInfo);
};

export const generateNewSpaceInvitationHash = async (spaceId: number): Promise<SpaceInfoDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/spaces/new-invitation-hash`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spaceId)
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((resp: SpaceInfoDto) => resp)
};

export const changeSpaceSettings = async (
    space: {
        id: number,
        name: string | undefined,
        isActive: boolean | undefined,
        allowedTags: EcapsTag[] | undefined
    }): Promise<SpaceInfoDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/spaces/change-settings`;

    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(space)
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((resp: SpaceInfoDto) => resp)
};


export const downloadPostAttachment = async (fileId: string, postId: number): Promise<Blob> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/get-file?fileId=` + fileId + "&postId=" + postId;

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
    };
    return await fetch(url, requestOptions)
        .then(handleBlobResponseNoLogoutWhenUnauthorized)
};