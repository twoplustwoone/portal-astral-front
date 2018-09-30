import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import {
    IProfileDispatchProps, IProfileContainerProps, IProfileFormValueProps,
} from '../../components';
import {profileActions, uiActions} from "../../actions";
import { withRouter } from "react-router";
import {IUser} from "../../../globals";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const mapStateToProps = (state: IStore, ownProps: IProfileContainerProps): IProfileFormValueProps => {
    const { id } = ownProps.match.params;
    const user: IUser | undefined = id ? state.user[id] : undefined;
    const isFetchingUser = state.ui.is.fetching.user[id];

    return {
        user,
        isFetchingUser,
        isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
        isDeleting: state.ui.is.deleting.professor,
    };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: IProfileContainerProps): IProfileDispatchProps => ({
    onCancel() {
        props.history.push('/');
    },

    onEdit: function (user: IUser) {
        return dispatch(profileActions.updateUser(user));
    },

    onClickDelete(user: IUser) {
        dispatch(uiActions.openDeleteConfirmationModal(user.id));
    },

    onCloseDelete() {
        dispatch(uiActions.closeDeleteConfirmationModal());
    },

    onConfirmDelete(user: IUser) {
        return dispatch(profileActions.deleteUser(user));
    },

    onFetchUser(userId: string) {
        dispatch(profileActions.fetchUser(userId));
    },

});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(ProfileForm)) as typeof ProfileForm;