import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import {
    IStudentTableDispatchProps,
    IStudentTableValueProps,
    IStudentTableContainerProps,
} from '../../components';
import { studentActions, uiActions } from "../../actions";
import { withRouter } from "react-router";
import { IStudent } from "../../../globals";
import {objectToArray} from "../../helpers/objectsToArray";
import StudentTable from "../../components/student/all-students/StudentTable";

const mapStateToProps = (state: IStore, ownProps: IStudentTableContainerProps): IStudentTableValueProps => {
    const students: IStudent[] = objectToArray(state.students);

    console.log(ownProps.match.params.id);

    return {
        students,
        isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
        isLoading: state.ui.is.loading.students,
        isDeletingStudent: state.ui.is.deleting.student,
    };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: IStudentTableContainerProps): IStudentTableDispatchProps => ({

    onClickAddNewStudent() {
        props.history.push('/new-student');
    },

    onClickDeleteStudent(student: IStudent) {
        dispatch(uiActions.openDeleteConfirmationModal(student.id));
    },

    onClickEditStudent(studentId: string) {
        props.history.push('/student/' + studentId);
    },

    onFetchStudents() {
        dispatch(studentActions.fetchStudents());
    },

});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(StudentTable)) as typeof StudentTable;