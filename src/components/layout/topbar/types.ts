import {IProfessor} from "../../../../globals";

export interface IProps extends IDispatchProps, IValueProps {
}

export interface IDispatchProps {
    onClickLogOut: () => any;
    onCloseLogOut: () => any;
    onConfirmLogOut: (professor: IProfessor) => any;
}

export interface IValueProps extends IContainerProps {
    professor?: IProfessor;
    isLogOutOpen: boolean;
}

export interface IContainerProps {
    history?: any;
}

export interface IState {
    anchorEl: any,
    mobileOpen: boolean,
}