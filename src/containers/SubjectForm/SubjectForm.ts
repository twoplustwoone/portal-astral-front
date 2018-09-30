import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import {
    SubjectForm,
    ISubjectFormDispatchProps,
    ISubjectFormValueProps,
    ISubjectContainerProps,
} from '../../components';
import { uiActions } from "../../actions";
import { withRouter } from "react-router";
import { ISubject } from "../../../globals";
import SubjectActions from "../../actions/subjectActions";

const mapStateToProps = (state: IStore, ownProps: ISubjectContainerProps): ISubjectFormValueProps => {
  const { id } = ownProps.match.params;
  const subject: ISubject | undefined = id ? state.subjects[id] : undefined;
    const isFetchingSubject = state.ui.is.fetching.subject[id];

    const isCreating = state.ui.is.creating.subject;
    return {
        subject,
        isFetchingSubject,
        isCreating,
        isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
        isDeleting: state.ui.is.deleting.subject,
    };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: ISubjectContainerProps): ISubjectFormDispatchProps => ({
    onCreate: function (subject: ISubject) {
        return dispatch(SubjectActions.createSubject(subject));
    },

    onCancel() {
        props.history.push('/subjects');
    },

    onEdit: function (subject: ISubject) {
        return dispatch(SubjectActions.updateSubject(subject));
    },

    onClickDelete(subject: ISubject) {
        dispatch(uiActions.openDeleteConfirmationModal(subject.id));
    },

    onCloseDelete() {
        dispatch(uiActions.closeDeleteConfirmationModal());
    },

    onConfirmDelete(subject: ISubject) {
        return dispatch(SubjectActions.deleteSubject(subject));
    },
  
    onFetchSubject(subjectId: string) {
        dispatch(SubjectActions.fetchSubject(subjectId));
    },

});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(SubjectForm)) as typeof SubjectForm;