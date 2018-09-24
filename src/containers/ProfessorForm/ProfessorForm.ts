import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import {
  ProfessorForm,
  IProfessorFormDispatchProps,
  IProfessorFormValueProps,
  IProfessorContainerProps,
} from '../../components';
import { professorActions, uiActions } from "../../actions";
import { withRouter } from "react-router";
import { IProfessor } from "../../../globals";

const mapStateToProps = (state: IStore, ownProps: IProfessorContainerProps): IProfessorFormValueProps => {
  const { id } = ownProps.match.params;

  const professor: IProfessor | undefined = id ? state.professors[id] : undefined;

  const isFetchingProfessor = state.ui.is.fetching.professor[id];

  const isCreating = state.ui.is.creating.professor;
  return {
    professor,
    isFetchingProfessor,
    isCreating,
    isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
    isDeleting: state.ui.is.deleting.professor,
  };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: IProfessorContainerProps): IProfessorFormDispatchProps => ({
  onCreate: function (professor: IProfessor) {
    return dispatch(professorActions.createProfessor(professor));
  },

  onCancel() {
    props.history.push('/professors');
  },

  onSave() {
      props.history.push('/');
  },

  onEdit: function (professor: IProfessor) {
    return dispatch(professorActions.updateProfessor(professor));
  },

  onClickDelete(professor: IProfessor) {
    dispatch(uiActions.openDeleteConfirmationModal(professor.id));
  },

  onLoading(professor: IProfessor){
    dispatch(uiActions.openLoadingModal(professor));
  },

  onCloseDelete() {
    dispatch(uiActions.closeDeleteConfirmationModal());
  },

  onConfirmDelete(professor: IProfessor) {
    return dispatch(professorActions.deleteProfessor(professor));
  },

  onFetchProfessor(professorId: string) {
    dispatch(professorActions.fetchProfessor(professorId));
  },

});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(ProfessorForm)) as typeof ProfessorForm;