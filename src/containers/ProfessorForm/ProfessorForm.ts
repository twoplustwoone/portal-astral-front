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
import {IProfessor} from "../../../globals";

const mapStateToProps = (state: IStore, ownProps: IProfessorContainerProps): IProfessorFormValueProps => {
  const { id } = ownProps.match.params;
  // const professor: IProfessor | undefined = {
  //   email: 'dffadsfasd@gmail.com',
  //   name: 'Francisco',
  //   id,
  //   lastName: 'Di Giandomenico',
  //   password: 'fasfdasf',
  //   file: "sasa",
  // };
  const professor: IProfessor | undefined = id ? state.professors[id] : undefined;

    console.log(ownProps.match.params.id);

    return {
    professor,
    isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
    isLoadingOpen: state.ui.is.open.loadingModal,
  };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: IProfessorContainerProps): IProfessorFormDispatchProps => ({
  onSubmit: function (professor: IProfessor) {
    return dispatch(professorActions.createProfessor(professor));
  },

  onCancel() {
    props.history.push('/');
  },

  onSave() {
    props.history.push('/professors');
  },

  onEdit: function (professor: IProfessor) {
    dispatch(professorActions.editProfessor(professor));
  },

  onClickDelete(professor: IProfessor) {
    dispatch(uiActions.openDeleteConfirmationModal(professor));
  },

  onCloseDelete() {
    dispatch(uiActions.closeDeleteConfirmationModal());
  },

  onConfirmDelete(professor: IProfessor) {
    dispatch(professorActions.deleteProfessor(professor));
  },

  onLoading(professor: IProfessor){
    dispatch(uiActions.openLoadingModal(professor));
  },
});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(ProfessorForm)) as typeof ProfessorForm;