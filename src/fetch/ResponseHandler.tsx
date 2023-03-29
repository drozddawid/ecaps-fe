export const handleResponseLogoutWhenUnauthorized = async (response: Response) => {
    if(response.ok){
        return await response.json();
    }else if(response.status === 401){
        window.sessionStorage.removeItem("persist:sessionstorageroot");
        window.location.reload();
    }
    else{
        // eslint-disable-next-line no-throw-literal
        throw {
            status: response.status,
            message: await response.text()
        };
    }
}

export const handleResponseNoLogoutWhenUnauthorized = async (response: Response) => {
    if(response.ok){
        return await response.json();
    }else{
        // eslint-disable-next-line no-throw-literal
        throw {
            status: response.status,
            message: await response.text()
        };
    }
}

export const handleBlobResponseNoLogoutWhenUnauthorized = async (response: Response) => {
    if(response.ok){
        return await response.blob();
    }else{
        // eslint-disable-next-line no-throw-literal
        throw {
            status: response.status,
            message: await response.text()
        };
    }
}

export interface ErrorResponse {
    status: number,
    message: string
}