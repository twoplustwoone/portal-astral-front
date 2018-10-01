/* Totality of props received. Usually left empty */
import {RouteComponentProps} from "react-router";

export type IProps = RouteComponentProps<IRouterProps> & IDispatchProps &  IValueProps

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
    onLogIn: (email:string, password:string) => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
}

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
    fields: IFields;
    errors: IErrors;
    login: ILoginState;
    loggedUser: ILoggedUser;
    showPassword: boolean;
    authenticated: boolean;
    anchorEl: null;
}

export interface IRouterProps {
    history: any;
}

export interface ILoggedUser {
    id: string;
    name: string;
    lastName: string;
}

export interface ILoginState {
    isLoading: boolean;
    success: boolean;
    error: boolean;
}

export interface IFields {
    email: string;
    password: string;
}

export type IErrors = {
    [p in keyof IFields]?: boolean
};