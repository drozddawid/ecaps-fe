import {store} from "../store/Store"
import {GetSpacesPostsDto} from "../model/GetSpacesPostsDto";
import {PostDto} from "../model/PostDto";
import {CreatePostDto} from "../model/CreatePostDto";
import {GetPostCommentsDto} from "../model/GetPostCommentsDto";
import {CommentDto} from "../model/CommentDto";
import {NewCommentDto} from "../model/NewCommentDto";

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
        .then((response: Response) => {
            if(response.ok){
                return response.json();
            }else if(response.status === 404){
                throw Error("User is not member of space.")
            }
        })
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
        .then(async (response: Response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw Error(await response.json())
            } else {
                throw Error(await response.json())
            }
        })
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
        .then((response: Response) => {
            if(response.ok){
                return response.json();
            }else if(response.status === 404){
                throw Error("User is not member of space.")
            }
        })
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
        .then((response: Response) => {
            if(response.ok){
                return response.json();
            }else if(response.status === 404){
                throw Error("User is not member of space.")
            }
        })
        .then((comment: CommentDto) => comment)
};