import {store} from "../store/Store"
import {SpaceInfoDto} from "../model/SpaceInfoDto";
import {handleResponseNoLogoutWhenUnauthorized} from "./ResponseHandler";
import {CodeResponse} from "@react-oauth/google";

export const signUp = async (): Promise<Response> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/users/signup`;

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
    };
    return await fetch(url, requestOptions);
};


export const authorizeSpaceGoogleApi = async (codeResponse: CodeResponse, spaceId: number): Promise<SpaceInfoDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/oauth2/google`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: codeResponse.code,
            scopes: codeResponse.scope,
            spaceId: spaceId
        })
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((response: SpaceInfoDto) => response);
};