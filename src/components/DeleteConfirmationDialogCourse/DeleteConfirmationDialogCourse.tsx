import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import * as React from "react";

const LoadingOverlay = () => (
    <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, .2)',
        top: '0',
        left: '0',
    }}
    >
        <CircularProgress />
    </div>
);

type Props = {
    isLoading: boolean,
    course: ICourse,
    subject: ISubject,
    handleCloseDelete: () => void,
    handleConfirmDelete: () => void,
};

export const DeleteConfirmationDialogCourse = (props: Props) => {
    return <Dialog open={true}>
        <DialogTitle>Confirm delete course </DialogTitle>
        <DialogContent>
            {props.isLoading && <LoadingOverlay />}
            <DialogContentText>
                This will permanently delete the course for the subject {props.subject ? props.subject.subjectName : "Loading"} with starting date {props.course.startDate} and cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleCloseDelete} color="primary" disabled={props.isLoading}>
                Cancel
            </Button>
            <Button onClick={props.handleConfirmDelete} color="secondary" variant='contained' disabled={props.isLoading}>
                Confirm
            </Button>
        </DialogActions>
    </Dialog>;
};
