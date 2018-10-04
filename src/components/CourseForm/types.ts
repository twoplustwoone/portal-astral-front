/* Totality of props received. Usually left empty */
import {ISubject} from "../../../globals";
import {IErrors, IFields} from "../CourseForm/types";

export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
    selectedValue: string;
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
    onFetchSubjects: () => any;
    onClose: (value: any) => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
    subjects: ISubject[];
    isLoading: boolean;
}

export interface IContainerProps {
    match: {
        params: {
            id: string;
            name: string;
        };
    };
    history: any;
}

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
    anchorEl: any;
    fields: IFields;
    errors: IErrors;
    isNew: boolean;
    mobileOpen: boolean;
    selectedValue: string;
    subjects: [];
}

export interface IFields {
    subjectName: string;
    startDate: string;
    endDate: string;
}

export type IErrors = {
    [p in keyof IFields]?: boolean
};