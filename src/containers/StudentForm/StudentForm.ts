import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import {
  StudentForm,
  IStudentFormDispatchProps,
  IStudentFormValueProps,
  IStudentContainerProps,
} from '../../components';
import { studentActions, uiActions } from "../../actions";
import { withRouter } from "react-router";
import { IStudent } from "../../../globals";

const mapStateToProps = (state: IStore, ownProps: IStudentContainerProps): IStudentFormValueProps => {
  const { id } = ownProps.match.params;

  const student: IStudent | undefined = id ? state.students[id] : undefined;

  const isFetchingStudent = state.ui.is.fetching.student[id];

  const isCreating = state.ui.is.creating.student;
  return {
    student,
    isFetchingStudent,
    isCreating,
    isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
    isDeleting: state.ui.is.deleting.student,
  };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: IStudentContainerProps): IStudentFormDispatchProps => ({
  onCreate: function (student: IStudent) {
    return dispatch(studentActions.createStudent(student));
  },

  onCancel() {
    props.history.push('/students');
  },

  onEdit: function (student: IStudent) {
    return dispatch(studentActions.updateStudent(student));
  },

  onClickDelete(student: IStudent) {
    dispatch(uiActions.openDeleteConfirmationModal(student.id));
  },

  onCloseDelete() {
    dispatch(uiActions.closeDeleteConfirmationModal());
  },

  onConfirmDelete(student: IStudent) {
    return dispatch(studentActions.deleteStudent(student));
  },

  onFetchStudent(studentId: string) {
    dispatch(studentActions.fetchStudent(studentId));
  },

});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(StudentForm)) as typeof StudentForm;