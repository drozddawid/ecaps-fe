import {Button, Container, Dialog, DialogTitle, Stack, TextField} from "@mui/material";
import * as yup from 'yup';
import {Form, Formik} from "formik";
import {createSpace} from "../../fetch/SpaceControllerFetches";

export interface NewSpaceInfo {

}

const validationSchema = yup.object().shape({
    spaceName: yup
        .string()
        .min(2, "Minimum space name length is 2")
        .max(255, "Maximum space name length is 255")
        .required("Space name is required")
});

export const NewSpaceDialog =
    (props: {
         isOpen: boolean,
        setOpen: (open: boolean) => void
     }
    ) => {
    const onSubmit = (spaceName: string) => {
        createSpace(spaceName)
            .then((response: Response) => {

            })
            .catch(() => {

            })
    }


        return (
            <Dialog open={props.isOpen} fullWidth={true} onClose={undefined}>
                <Container>
                    <DialogTitle>Create new space</DialogTitle>
                    <Formik initialValues={{
                        spaceName: ""
                    }}
                            validationSchema={validationSchema}
                            onSubmit={values => onSubmit(values.spaceName)}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit} style={{border: 2}}>

                                    <TextField
                                        fullWidth
                                        id="spaceName"
                                        name="spaceName"
                                        label="Space name"
                                        value={formik.values.spaceName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.spaceName && Boolean(formik.errors.spaceName)}
                                        helperText={formik.touched.spaceName && formik.errors.spaceName}
                                    />
                                <Stack direction={"row"} spacing={3}>
                                    <Button type={"submit"}>Submit</Button>
                                    <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Dialog>
        );

    }