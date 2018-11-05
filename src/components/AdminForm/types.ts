import * as H from "history";
import {match} from "react-router";
import {Option} from "prelude.ts";

export interface IProps {
    history: H.History;
    location: H.Location<any>;
    match: match<any>;
};

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
    fields: IFields;
    errors: IErrors;
    showPassword: boolean;
    isNew: boolean;
    isEditing: boolean;
    isFetching: boolean;
    isDeleting: boolean;
    isCreating: boolean;
    redirect?: string;
    admin?: IAdmin;
    isDeleteModalOpen: boolean;
    adminsAmount: Option<number>;
    isSnackbarOpen: boolean;
}

export interface IFields {
    name: string;
    lastName: string;
    email: string;
    password: string;
    id: string;
    file?: string;
}

export type IErrors = {
    [p in keyof IFields]?: boolean
};