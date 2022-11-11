import {Box, Tab, Tabs, TextareaAutosize, Typography} from "@mui/material";
import React, {SyntheticEvent, useState} from "react";
import TextArea from "@uiw/react-md-editor/lib/components/TextArea";
import MuiMarkdown from "mui-markdown";


const TabPanel = (props: { children?: React.ReactNode, index: number, value: number }) => {
    return (
        <div
            hidden={props.value !== props.index}
        >
            {props.value === props.index && (
                <Box>
                    {props.children}
                </Box>
            )}
        </div>
    );
}


export const SimpleMDEditor = (
    props: {
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>
        minLines: number
    }) => {
    const [selectedTab, setSelectedTab] = useState(0);


    return (
        <Box>
            <Tabs
                value={selectedTab}
                onChange={(event: SyntheticEvent<Element, Event>, value: any) => setSelectedTab(value)}>
                <Tab sx={{fontSize: "small"}} label={"Raw"}/>
                <Tab label={"Preview"}/>
            </Tabs>
            <TabPanel index={0} value={selectedTab}>
                <TextareaAutosize style={{flexGrow: 1, flex: 1, width: "100%", height: "100%"}} minRows={props.minLines}
                                  value={props.value}
                                  onChange={(event) => props.setValue(event.currentTarget.value)}></TextareaAutosize>
            </TabPanel>
            <TabPanel index={1} value={selectedTab}>
                <Box sx={{p: 1, wordBreak: "break-word"}}>
                    <MuiMarkdown overrides={{
                        h1: {component: 'h1'},
                        h2: {component: 'h2'},
                        h3: {component: 'h3'},
                        h4: {component: 'h4'},
                        h5: {component: 'h5'},
                        h6: {component: 'h6'},
                    }}
                    >{props.value}</MuiMarkdown>
                </Box>
            </TabPanel>
        </Box>
    );
}