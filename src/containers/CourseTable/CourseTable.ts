import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import {
    ICourseTableDispatchProps,
    ICourseTableValueProps,
    ICourseTableContainerProps,
} from '../../components';
import { courseActions, uiActions } from "../../actions";
import { withRouter } from "react-router";
import { ICourse } from "../../../globals";
import { objectToArray } from "../../helpers/objectToArray";
import CourseTable from "../../components/CourseTable/CourseTable";

const mapStateToProps = (state: IStore, ownProps: ICourseTableContainerProps): ICourseTableValueProps => {
  const courses: ICourse[] = objectToArray(state.courses);

  return {
    courses,
    isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
    isLoading: state.ui.is.loading.courses,
    isDeletingCourse: state.ui.is.deleting.course,
  };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: ICourseTableContainerProps): ICourseTableDispatchProps => ({

    onClickAddNewCourse() {
        props.history.push('/new-course');
    },

    onClickDeleteCourse(courseId: string) {
        dispatch(uiActions.openDeleteConfirmationModal(courseId));
    },

    onClickEditCourse(courseId: string) {
        props.history.push('/course/' + courseId);
    },

    onFetchCourses() {
        dispatch(courseActions.fetchCourses());
    },

    onCloseDelete() {
        dispatch(uiActions.closeDeleteConfirmationModal());
    },

    onConfirmDelete(course: ICourse) {
        dispatch(courseActions.deleteCourse(course));
    },
});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(CourseTable)) as typeof CourseTable;