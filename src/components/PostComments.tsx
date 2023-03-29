import InfiniteScroll from "react-infinite-scroll-component";
import {Avatar, Box, Container, Divider, Paper, Stack, Tooltip, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {CommentDto} from "../model/CommentDto";
import _ from "lodash";
import MuiMarkdown from "mui-markdown";
import {getPostComments} from "../fetch/PostControllerFetches";
import {PostDto} from "../model/PostDto";
import {comment} from "@uiw/react-md-editor/lib/commands/comment";

export const PostComments = (
    props: {
        postId: number
        comments: CommentDto[],
        setComments: (comments: CommentDto[]) => void
    }) => {
    const [hasMore, setHasMore] = useState(true);
    const commentsOnPage = 5;

    const [scrollHeight, setScrollHeight] = useState("0px");
    const [fetchedMore, setFetchedMore] = useState(false);
    const scrollPaper = useRef(null);

    const fetchMoreComments = () => {
        let commentsLen = props.comments.length;
        getPostComments({
            postId: props.postId,
            pageSize: commentsOnPage,
            pageNumber: Math.trunc(commentsLen / commentsOnPage)
        })
            .then((comments: CommentDto[]) => {
            if (comments.length < commentsOnPage) {
                setHasMore(false);
            }
            props.setComments(props.comments.concat(comments));
        }).catch((error: Error) =>{
            setHasMore(false);
            console.log(error);
        })


    }
    const scrollToComments = () => {
        if (scrollPaper.current != null) {
            // @ts-ignore
            scrollPaper.current.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }

    useEffect(() => {
        fetchMoreComments();
    }, [])

    useEffect(() =>{
        if(props.comments.length > 0 && scrollHeight==="0px"){
            setScrollHeight("20vh")
        }
    }, [props.comments]);
    return (
        <Box id={"scrollPaper"} ref={scrollPaper} sx={{spacing: "10", transition: "height 0.3s", height: scrollHeight}}>
            <InfiniteScroll
                onScroll={e => {

                }}
                height={scrollHeight}
                next={() => {
                    if (!fetchedMore) {
                        if (scrollPaper != null && scrollHeight !== "80vh") {
                            scrollToComments();
                            setTimeout(() => setScrollHeight("80vh"), 800);
                        }
                    }
                    setFetchedMore(true);
                    fetchMoreComments()
                }}
                hasMore={hasMore}
                loader={
                    <Container maxWidth={"md"}>
                        <Typography sx={{m: 2, textAlign: "center"}}
                                    typography={"subtitle2"}>Loading...</Typography>
                    </Container>}
                dataLength={props.comments.length}
                endMessage={
                    null
                }

            >
                <Container maxWidth={"lg"}>
                    <Stack
                        spacing={1}
                    >
                        {props.comments.map((comment, index) => {
                            return (
                                <Comment key={index} {...comment} />
                            );
                        })}
                    </Stack>
                </Container>

            </InfiniteScroll>
        </Box>
    );
}

export const Comment = (
    comment: CommentDto,
    editable?: boolean
) => {

    return (
        <Paper variant={"elevation"} elevation={3}>
            <Box sx={{py: 0.1, px: 1}}>
                <Tooltip title={
                    <Stack>
                        <Typography sx={{mt: 1}} typography={"caption"}>{comment.author.email}</Typography>
                    </Stack>
                } placement={"left"}>
                    <Stack direction={"row"}>
                        <Avatar sx={{height: "20px", width: "20px", mr: 0.5, mt: 0.5}} src={comment.author.pictureURL}
                                alt={comment.author.name}/>
                        <Typography sx={{mt: 0.5, mb: 0.5}} typography={"subtitle2"}>{comment.author.name}</Typography>
                        <Box sx={{flexGrow:1}}/>
                        <Typography sx={{mt: 0.5, mb: 0.5}} typography={"caption"}>{comment.createdOn.replace("T", " ").substring(0, comment.createdOn.lastIndexOf(":"))}</Typography>
                    </Stack>
                </Tooltip>
                <Divider/>
                <Box sx={{p: 1, wordBreak: "break-word"}}>
                    <MuiMarkdown overrides={{
                        h1: {component: 'h3'},
                        h2: {component: 'h4'},
                        h3: {component: 'h5'},
                        h4: {component: 'h6'},
                        h5: {component: 'h6'},
                        h6: {component: 'h6'},
                    }}
                    >{comment.content}</MuiMarkdown>
                </Box>
            </Box>

        </Paper>
    );
}