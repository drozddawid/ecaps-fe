import {Alert, Stack} from "@mui/material";
import React from "react";

export interface AlertInfo {
    message: string,
    type: "info" | "success" | "warning" | "error"
}

export const AlertStack = (
    props: {
        alerts: AlertInfo[],
        setAlerts: (alert: AlertInfo[]) => void
    }
) => {
    return (
        <Stack>
            {
                props.alerts.map((alert, index) => {
                    return (
                        <Alert key={index} severity={alert.type}
                               onClose={() => props.setAlerts(props.alerts.filter(a => a.type !== alert.type && a.message !== alert.message))}
                        >{alert.message}</Alert>
                    )
                })
            }
        </Stack>
    );
}