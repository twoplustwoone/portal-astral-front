/* Totality of props received. Usually left empty */
import {IUser} from "../../../globals";

export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
    onEdit: (User: IUser) => any;
    onCancel: () => any;
    onClickDelete: (User: IUser) => any;
    onCloseDelete: () => any;
    onConfirmDelete: (User: IUser) => any;
    onFetchUser: (userId: string) => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
    user?: IUser;
    isDeleteConfirmationOpen: boolean;
    isFetchingUser: boolean;
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
    showPassword: boolean;
    errors: IErrors;
    isNew: boolean;
    isEditing: boolean;
    userType: string;
}

export interface IFields {
    name: string;
    lastName: string;
    email: string;
    password: string;
    id: string;
    file?: string;
    birthday?: string;
    identificationType: string;
    identification: string;
    address?: string;
    careerId: string;
}

export type IErrors = {
    [p in keyof IFields]?: boolean
};