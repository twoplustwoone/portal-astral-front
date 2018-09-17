import {IAction, IUser} from "../../globals";

namespace UIActions {

    export const OPEN_DELETE_CONFIRMATION_MODAL = '@ASTRAL.OPEN_DELETE_CONFIRMATION_MODAL';
    export const CLOSE_DELETE_CONFIRMATION_MODAL = '@ASTRAL.CLOSE_DELETE_CONFIRMATION_MODAL';

    export const OPEN_LOADING_MODAL = '@ASTRAL.OPEN_LOADING_MODAL';
    export const CLOSE_LOADING_MODAL = '@ASTRAL.CLOSE_LOADING_MODAL';

    export const openDeleteConfirmationModal = (user: IUser): IAction => ({
        type: OPEN_DELETE_CONFIRMATION_MODAL,
        payload: {
          user,
        },
    });

    export const closeDeleteConfirmationModal = (): IAction => ({
        type: CLOSE_DELETE_CONFIRMATION_MODAL,
    });

    export const openLoadingModal = (user: IUser): IAction => ({
        type: OPEN_LOADING_MODAL,
        payload: {
            user,
        },
    });

    export const closeLoadingModal = (): IAction => ({
        type: CLOSE_LOADING_MODAL,
    });
}

export default UIActions;