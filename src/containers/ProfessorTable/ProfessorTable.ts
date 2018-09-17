import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import {
  ProfessorTable,
  IProfessorTableDispatchProps,
  IProfessorTableValueProps,
  IProfessorTableContainerProps,
} from '../../components';
import { professorActions, uiActions } from "../../actions";
import { withRouter } from "react-router";
import { IProfessor } from "../../../globals";
import { objectToArray } from "../../helpers/objectToArray";

const mapStateToProps = (state: IStore, ownProps: IProfessorTableContainerProps): IProfessorTableValueProps => {
  const professors: IProfessor[] = objectToArray(state.professors);

  console.log(ownProps.match.params.id);

  return {
    professors,
    isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
    isLoading: state.ui.is.loading.professors,
    isDeletingProfessor: state.ui.is.deleting.professor,
  };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: IProfessorTableContainerProps): IProfessorTableDispatchProps => ({

  onClickAddNewProfessor() {
    props.history.push('/new-professor');
  },

  onClickDeleteProfessor(professor: IProfessor) {
    dispatch(uiActions.openDeleteConfirmationModal(professor));
  },

  onClickEditProfessor(professorId: string) {
    props.history.push('/professor/' + professorId);
  },

  onFetchProfessors() {
    dispatch(professorActions.fetchProfessors());
  },

});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(ProfessorTable)) as typeof ProfessorTable;