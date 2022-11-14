import {store} from "../store/Store"
import {SpaceInfoDto} from "../model/SpaceInfoDto";
import {bool} from "yup";
import {EcapsTag} from "../model/EcapsTag";

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
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw Error("User not found")
            }
        })
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
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw Error("User not found")
            }
        })
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
        .then(handleResponse)
        .then((spaceInfo: SpaceInfoDto) => spaceInfo);
};

export interface ErrorResponse {
    status: number,
    message: string
}

export const handleResponse = async (response: Response) => {
    if(response.ok){
        return await response.json();
    }else{
        let errorResponse: ErrorResponse = {
            status: response.status,
            message: await response.text()
        }
        throw errorResponse;
    }
}

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
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw Error("Space not found.");
            } else {
                throw Error("Error when trying to add user to space.");
            }
        })
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
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Error occurred while fetching spaces managed by user.")
            }
        })
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
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw Error("Space not found.");
            } else {
                throw Error("Error when trying to create new invitation hash.");
            }
        })
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
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw Error("Space not found.");
            } else if (response.status === 400) {
                throw Error("User is not manager of space, so they can't change it's settings.");
            } else {
                throw Error("Error when trying to change space settings.");
            }
        })
        .then((resp: SpaceInfoDto) => resp)
};