import {Box, Chip, Container, Stack, Typography} from "@mui/material";
import {EcapsBar} from "../components/EcapsBar";
import {useParams} from "react-router-dom";
import {Post} from "../components/Post";
import {useEffect, useState} from "react";
import {NewPostDialog} from "../components/dialogs/NewPostDialog";
import {getSpacePosts} from "../fetch/PostControllerFetches";
import {ErrorResponse, getSpaceInfo, getSpacesManagedByUser} from "../fetch/SpaceControllerFetches";
import InfiniteScroll from 'react-infinite-scroll-component';
import {PostDto} from "../model/PostDto";
import {SpaceInfoDto} from "../model/SpaceInfoDto";
import {SpaceConfigDialog} from "../components/dialogs/SpaceConfigDialog";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store";

export const SpacePage = () => {
    //todo at the beginning check if user is allowed to see space, otherwise show info that they're not allowed to be here

    const {spaceHash} = useParams();
    const [spaceInfo, setSpaceInfo] = useState<SpaceInfoDto>();
    const [errInfo, setErrInfo] = useState("");

    const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
    const [showSpaceConfigButton, setShowSpaceConfigButton] = useState(false);
    const [showSpaceConfigDialog, setShowSpaceConfigDialog] = useState(false);
    const userEmail = useSelector((root : RootState) => root.UserSlice.parsedUserToken?.email);

    let [posts, setPosts] = useState<PostDto[]>([]);
    let [hasMore, setHasMore] = useState(true);
    const postsOnPage = 5;

    const onCreateNewPostButtonClick = () => {
        setShowCreatePostDialog(true);
    }

    const fetchMorePosts = () => {
        let postsLen = posts.length;
        if (spaceInfo == null || !spaceInfo.isActive) return;
        getSpacePosts(
            {
                spaceId: spaceInfo?.id || -1,
                pageNumber: Math.trunc(postsLen / postsOnPage),
                pageSize: postsOnPage
            })
            .then((postsDto: PostDto[]) => {
                if (postsDto.length < postsOnPage) {
                    setHasMore(false);
                }
                setPosts(posts.concat(postsDto));
            })
            .catch((error: Error) => {
                setHasMore(false);
                console.log(error)
            });
    }

    const checkIfUserIsManager = () => {
        getSpacesManagedByUser()
            .then((spaces: SpaceInfoDto[]) => {
                if (spaces.find(s => s.id === (spaceInfo?.id || -1))) {
                    setShowSpaceConfigButton(true);
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const spaceSettingsAction = () => {
        setShowSpaceConfigDialog(true);
    }


    useEffect(() => {
        getSpaceInfo(spaceHash || "noSpaceHash")
            .then((spaceInfo: SpaceInfoDto) => {
                if (!spaceInfo.isActive) {
                    setErrInfo("Space is inactive")
                    setHasMore(false);
                }
                setSpaceInfo(spaceInfo)
            })
            .catch((error: ErrorResponse) => {
                if (error.status === 404) {
                    setErrInfo("Space doesn't exist.")
                } else if (error.status === 400) {
                    if (error.message.includes("not member"))
                        setErrInfo("You are not member of this space.")
                    else if (error.message.includes("inactive"))
                        setErrInfo(error.message)
                }
                setHasMore(false);
                console.log(error)
            })
    }, [spaceHash]);

    useEffect(() => {
        if (spaceInfo != null && !spaceInfo.isActive) {
            setErrInfo("Space is inactive")
            setHasMore(false);
        }
        fetchMorePosts();
        checkIfUserIsManager();
    }, [spaceInfo]);


    return (
        <div>
            <EcapsBar showMySpaces={true} createPostClickAction={onCreateNewPostButtonClick}
                      spaceSettingsAction={showSpaceConfigButton ? spaceSettingsAction : undefined}/>
            {(!spaceInfo || !spaceInfo.isActive) ?
                <Container maxWidth="lg">
                    <div>
                        <Typography sx={{m: 4, wordBreak: "break-word", textAlign: "center"}} typography={"h4"}>
                            {errInfo}</Typography>
                    </div>
                </Container>
                :
                <InfiniteScroll next={fetchMorePosts}
                                hasMore={hasMore}
                                loader={
                                    <Container maxWidth={"md"}>
                                        <Typography sx={{m: 2, textAlign: "center"}}
                                                    typography={"h4"}>Loading...</Typography>
                                    </Container>}
                                dataLength={posts.length}
                                endMessage={
                                    <p style={{textAlign: 'center'}}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                >

                    <Container maxWidth="lg">
                        <Stack>
                            <div>
                                <Typography sx={{wordBreak: "break-word", textAlign: "center"}} typography={"h5" +
                                    ""}>
                                    {spaceInfo?.name || ""}</Typography>
                            </div>
                            <Box sx={{
                                p: 1,
                                flexGrow: 1,
                                minHeight: "80px",
                                maxHeight: "10vh",
                                overflowY: "auto",
                                overscrollBehavior: "auto"
                            }}>
                                {
                                    spaceInfo?.allowedTags
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((t) => {
                                            return (
                                                <Chip key={t.id} clickable sx={{mx: 0.2}} size={"small"} label={t.name}/>
                                            );
                                        })
                                }
                            </Box>
                            {
                                posts.map((post: PostDto) => {
                                    return (
                                        <Post key={post.id} postInfo={post} editable={post.author.email === userEmail} commentable={true}></Post>
                                    );
                                })
                            }
                        </Stack>
                    </Container>
                </InfiniteScroll>
            }
            {spaceInfo?.id && spaceInfo.allowedTags &&
                <NewPostDialog open={showCreatePostDialog} setOpen={setShowCreatePostDialog} spaceId={spaceInfo.id}
                               allowedTags={spaceInfo.allowedTags}/>
            }
            {spaceInfo && showSpaceConfigDialog &&
                <SpaceConfigDialog open={showSpaceConfigDialog} setOpen={setShowSpaceConfigDialog}
                                   spaceInfo={spaceInfo} setSpaceInfo={setSpaceInfo}/>
            }
        </div>
    );
}