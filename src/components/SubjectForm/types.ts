/* Totality of props received. Usually left empty */
import {ISubject} from "../../../globals";

export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
    onCreate: (subject: ISubject) => any;
    onEdit: (professor: ISubject) => any;
    onCancel: () => any;
    onClickDelete: (professor: ISubject) => any;
    onCloseDelete: () => any;
    onConfirmDelete: (professor: ISubject) => any;
    onFetchProfessor: (professorId: string) => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
    subject?: ISubject;
    all_subjects: ISubject[];
    errors: IErrors;
    isDeleteConfirmationOpen: boolean;
    isFetchingSubject: boolean;
    isFetchingSubjects: boolean;
    isCreating: boolean;
    isDeleting: boolean;
}

export interface IContainerProps {
    match: {
        params: {
            id: string;
        };
    };
    history: any;
}

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
    fields: IFields;
    // errors: IErrors;
    isNew: boolean;
    isEditing: boolean;
    subjects: {
        all_subjects: Map<string, ISubject>;
        required_subjects: Map<string, ISubject>; // Array.from ..  For handleSubmit
    };
}


export interface IFields {
    id: string;
    name: string;
    careerYear: number;
    required_subjects: ISubject[];
}

export type IErrors = {
    [p in keyof IFields]?: boolean
};