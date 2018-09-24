import {IProfessor, IUser} from "../../../../globals";
import { RouteComponentProps } from "react-router";

export type IProps = RouteComponentProps<IRouterProps> & IDispatchProps & IValueProps & IContainerProps;

export interface IDispatchProps {
    onClickLogOut: () => any;
    onCloseLogOut: () => any;
    onConfirmLogOut: (professor: IProfessor) => any;
}

export interface IValueProps {
    user?: IUser;
    isLogOutOpen: boolean;
}

export interface IContainerProps {
}

export interface IState {
    anchorEl: any,
    mobileOpen: boolean,
}

/* Esta interfaz tiene que llevar los parametros que esperas recibir en la URL. Si no esperas recibir nada, dejar vacia */
interface IRouterProps {
}