import {Box, Button, Chip, Container, Stack, Typography} from "@mui/material";
import {EcapsBar} from "../components/EcapsBar";
import {useParams} from "react-router-dom";
import {Post} from "../components/Post";
import {useEffect, useState} from "react";
import {NewPostDialog} from "../components/dialogs/NewPostDialog";
import {getSpacePosts, getSpacePostsFilteredByTags} from "../fetch/PostControllerFetches";
import {getSpaceInfo, getSpacesManagedByUser} from "../fetch/SpaceControllerFetches";
import InfiniteScroll from 'react-infinite-scroll-component';
import {PostDto} from "../model/PostDto";
import {SpaceInfoDto} from "../model/SpaceInfoDto";
import {SpaceConfigDialog} from "../components/dialogs/SpaceConfigDialog";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store";
import {EditablePost} from "../components/EditablePost";
import {ErrorResponse} from "../fetch/ResponseHandler";
import {EcapsTag} from "../model/EcapsTag";
import {TagChooser} from "../components/TagChooser";

export const SpacePage = () => {

    const {spaceHash} = useParams();
    const [spaceInfo, setSpaceInfo] = useState<SpaceInfoDto>();
    const [errInfo, setErrInfo] = useState("");

    const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
    const [showSpaceConfigButton, setShowSpaceConfigButton] = useState(false);
    const [showSpaceConfigDialog, setShowSpaceConfigDialog] = useState(false);
    const userEmail = useSelector((root: RootState) => root.UserSlice.parsedUserToken?.email);

    const [tagsFilter, setTagsFilter] = useState<EcapsTag[]>([]);
    let [posts, setPosts] = useState<PostDto[]>([]);
    let [hasMore, setHasMore] = useState(true);
    const postsOnPage = 5;

    const onCreateNewPostButtonClick = () => {
        setShowCreatePostDialog(true);
    }

    const fetchMorePosts = () => {
        let postsLen = posts.length;
        if (spaceInfo == null || !spaceInfo.isActive || !hasMore) return;
        getSpacePostsFilteredByTags(
            {
                spaceId: spaceInfo?.id || -1,
                pageNumber: Math.trunc(postsLen / postsOnPage),
                pageSize: postsOnPage,
                tags: tagsFilter
            })
            .then((postsDto: PostDto[]) => {
                if (postsDto.length < postsOnPage) {
                    setHasMore(false);
                } else setHasMore(true);
                setPosts(posts.concat(postsDto));
            })
            .catch((error: Error) => {
                setHasMore(false);
                console.log(error)
            });
    }

    const filter = () => {
        setPosts([]);
        setHasMore(true);
        fetchMorePosts();
    }

    useEffect(() => {
            if (tagsFilter.length === 0) {
                setPosts([]);
                setHasMore(true);
            }
        }
        , [tagsFilter])

    useEffect(() => {
        if (posts.length === 0 && hasMore) {
            fetchMorePosts();
        }
    }, [hasMore, posts])

    // const fetchMorePosts = () => {
    //     let postsLen = posts.length;
    //     if (spaceInfo == null || !spaceInfo.isActive || !hasMore) return;
    //     getSpacePosts(
    //         {
    //             spaceId: spaceInfo?.id || -1,
    //             pageNumber: Math.trunc(postsLen / postsOnPage),
    //             pageSize: postsOnPage
    //         })
    //         .then((postsDto: PostDto[]) => {
    //             if (postsDto.length < postsOnPage) {
    //                 setHasMore(false);
    //             }
    //             setPosts(posts.concat(postsDto));
    //         })
    //         .catch((error: Error) => {
    //             setHasMore(false);
    //             console.log(error)
    //         });
    // }

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


    const getEndMessage = () => {
        if (posts.length === 0) {
            return (<p style={{textAlign: 'center'}}>
                <b>Nothing to see here</b>
            </p>);
        } else return (
            <p style={{textAlign: 'center'}}>
                <b>Yay! You have seen it all</b>
            </p>);
    };
    return (
        <div>
            <EcapsBar showMySpaces={true}
                      createPostClickAction={spaceInfo?.isActive || false ? onCreateNewPostButtonClick : undefined}
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
                                endMessage={getEndMessage()}
                >

                    <Container maxWidth="lg">
                        <Stack>
                            <div>
                                <Typography sx={{wordBreak: "break-word", textAlign: "center"}} typography={"h4" +
                                    ""}>
                                    {spaceInfo?.name || ""}</Typography>
                            </div>

                            <TagChooser selectedTags={tagsFilter} setSelectedTags={setTagsFilter}
                                        allowedTags={spaceInfo.allowedTags}></TagChooser>
                            <Box> <Button disabled={tagsFilter.length === 0} onClick={() => filter()}>Filter by
                                tags</Button>
                            </Box>
                            {/*<Box sx={{*/}
                            {/*    p: 1,*/}
                            {/*    flexGrow: 1,*/}
                            {/*    minHeight: "80px",*/}
                            {/*    maxHeight: "10vh",*/}
                            {/*    overflowY: "auto",*/}
                            {/*    overscrollBehavior: "auto"*/}
                            {/*}}>*/}
                            {/*    {*/}
                            {/*        spaceInfo?.allowedTags*/}
                            {/*            .sort((a, b) => a.name.localeCompare(b.name))*/}
                            {/*            .map((t) => {*/}
                            {/*                return (*/}
                            {/*                    <Chip key={t.id} clickable sx={{mx: 0.2}} size={"small"}*/}
                            {/*                          label={t.name}/>*/}
                            {/*                );*/}
                            {/*            })*/}
                            {/*    }*/}
                            {/*</Box>*/}
                            {
                                posts.map((post: PostDto) => {
                                    return (
                                        <EditablePost key={post.id} spaceInfo={spaceInfo} postInfo={post}
                                                      setPostInfoAfterUpload={(post: PostDto) => setPosts(posts.map(p => p.id === post.id ? {...post} : p))}
                                                      onDelete={(postId: number) => setPosts(posts.filter(p => p.id !== postId))}
                                                      editable={post.author.email === userEmail}
                                        />
                                    );
                                })
                            }
                        </Stack>
                    </Container>
                </InfiniteScroll>
            }
            {spaceInfo?.id && spaceInfo.allowedTags &&
                <NewPostDialog
                    hasGoogleDriveConfigured={spaceInfo.hasGoogleDriveConfigured}
                    open={showCreatePostDialog}
                    setOpen={setShowCreatePostDialog}
                    spaceId={spaceInfo.id}
                    allowedTags={spaceInfo.allowedTags}
                    addPost={(post: PostDto) => setPosts([post].concat(posts))}
                />
            }
            {spaceInfo && showSpaceConfigDialog &&
                <SpaceConfigDialog open={showSpaceConfigDialog} setOpen={setShowSpaceConfigDialog}
                                   spaceInfo={spaceInfo} setSpaceInfo={setSpaceInfo}/>
            }
        </div>
    );
}