import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import {
    ISubjectTableDispatchProps,
    ISubjectTableValueProps,
    ISubjectTableContainerProps,
} from '../../components';
import { uiActions } from "../../actions";
import { withRouter } from "react-router";
import { ISubject } from "../../../globals";
import { objectToArray } from "../../helpers/objectToArray";
import SubjectTable from "../../components/SubjectTable/SubjectTable";
import SubjectActions from "../../actions/subjectActions";

const mapStateToProps = (state: IStore, ownProps: ISubjectTableContainerProps): ISubjectTableValueProps => {
  const subjects: ISubject[] = objectToArray(state.subjects);

  return {
    subjects,
    isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
    isLoading: state.ui.is.loading.subjects,
    isDeletingSubject: state.ui.is.deleting.subject,
  };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: ISubjectTableContainerProps): ISubjectTableDispatchProps => ({

    onClickAddNewSubject() {
        props.history.push('/new-subject');
    },

    onClickDeleteSubject(subjectId: string) {
        dispatch(uiActions.openDeleteConfirmationModal(subjectId));
    },

    onClickEditSubject(subjectId: string) {
        props.history.push('/subject/' + subjectId);
    },

    onFetchSubjects() {
        dispatch(SubjectActions.fetchSubjects());
    },

    onCloseDelete() {
        dispatch(uiActions.closeDeleteConfirmationModal());
    },

    onConfirmDelete(subject: ISubject) {
        dispatch(SubjectActions.deleteSubject(subject));
    },
});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(SubjectTable)) as typeof SubjectTable;