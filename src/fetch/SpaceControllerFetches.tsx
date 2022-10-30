import {store} from "../store/Store"

export const createSpace = async (spaceName: string): Promise<Response> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/spaces`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/text'
        },
        body: JSON.stringify(spaceName)
    };
    return await fetch(url, requestOptions);
};