import {store} from "../store/Store"
import {GetSpacesPostsDto} from "../model/GetSpacesPostsDto";
import {PostDto} from "../model/PostDto";
import {CreatePostDto} from "../model/CreatePostDto";
import {GetPostCommentsDto} from "../model/GetPostCommentsDto";
import {CommentDto} from "../model/CommentDto";
import {NewCommentDto} from "../model/NewCommentDto";
import {handleResponseLogoutWhenUnauthorized, handleResponseNoLogoutWhenUnauthorized} from "./ResponseHandler";
import {UpdatePostDto} from "../model/UpdatePostDto";

export const getSpacePosts = async (spacesPostDto: GetSpacesPostsDto): Promise<PostDto[]> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/space`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spacesPostDto)
    };
    return await fetch(url, requestOptions)
        .then(handleResponseLogoutWhenUnauthorized)
        .then((posts: PostDto[]) => posts)
};


export const createPost = async (post: CreatePostDto): Promise<PostDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/posts`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    };
    return await fetch(url, requestOptions)
        .then(handleResponseLogoutWhenUnauthorized)
        .then((post: PostDto) => post);
};

export const getPostComments = async (getPostsComments: GetPostCommentsDto): Promise<CommentDto[]> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/comments`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getPostsComments)
    };
    return await fetch(url, requestOptions)
        .then(handleResponseLogoutWhenUnauthorized)
        .then((comments: CommentDto[]) => comments)
};

export const addNewComment = async (newComment: NewCommentDto): Promise<CommentDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/new-comment`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((comment: CommentDto) => comment)
};


export const uploadPostAttachment = async (attachments: FormData, postId:number): Promise<PostDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/upload-file?postId=` + postId;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken
        },
        body: attachments
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((resp: PostDto) => resp)
};


export const updatePost = async (updatePost: UpdatePostDto): Promise<PostDto> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/update-post`;

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePost)
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((resp: PostDto) => resp)
};


export const deletePost = async (postId: number): Promise<string> => {
    const userToken = store.getState().UserSlice.userToken;
    const url = `${process.env.REACT_APP_BACKEND_ADDRESS}/posts/delete-post`;

    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postId)
    };
    return await fetch(url, requestOptions)
        .then(handleResponseNoLogoutWhenUnauthorized)
        .then((resp: string) => resp)
};