import {store} from "../store/Store"

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