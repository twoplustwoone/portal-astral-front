import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import {
    IProfessorTableDispatchProps,
    IProfessorTableValueProps,
    IProfessorTableContainerProps,
} from '../../components';
import { professorActions, uiActions } from "../../actions";
import { withRouter } from "react-router";
import { IProfessor } from "../../../globals";
import { objectToArray } from "../../helpers/objectToArray";
import ProfessorTable from "../../components/ProfessorTable/ProfessorTable";

const mapStateToProps = (state: IStore, ownProps: IProfessorTableContainerProps): IProfessorTableValueProps => {
  const professors: IProfessor[] = objectToArray(state.professors);

  return {
    professors,
    isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
    isLoading: state.ui.is.loading.professors,
    isDeletingProfessor: state.ui.is.deleting.professor,
  };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: IProfessorTableContainerProps): IProfessorTableDispatchProps => ({

    onClickAddNewProfessor() {
        props.history.push('/new-user');
    },

    onClickDeleteProfessor(professorId: string) {
        dispatch(uiActions.openDeleteConfirmationModal(professorId));
    },

    onClickEditProfessor(professorId: string) {
        props.history.push('/user/' + professorId);
    },

    onFetchProfessors() {
        dispatch(professorActions.fetchProfessors());
    },

    onCloseDelete() {
        dispatch(uiActions.closeDeleteConfirmationModal());
    },

    onConfirmDelete(professor: IProfessor) {
        dispatch(professorActions.deleteProfessor(professor));
    },
});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(ProfessorTable)) as typeof ProfessorTable;