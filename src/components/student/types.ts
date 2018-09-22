/* Totality of props received. Usually left empty */
import { IStudent } from "../../../globals";

export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
    onClickEditStudent: (studentId: string) => any;
    onClickDeleteStudent: (student: IStudent) => any;
    onClickAddNewStudent: () => any;
    onFetchStudents: () => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
    students?: IStudent[];
    isDeleteConfirmationOpen: boolean;
    isDeletingStudent: boolean;
    isLoading: boolean;
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
}