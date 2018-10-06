import {
    ICoursesTableDispatchProps,
    ICoursesTableValueProps,
    ICoursesTableContainerProps,
} from '../../components';
import {IStore} from "../../reducers";
import {ICourse} from "../../../globals";
import {objectToArray} from "../../helpers/objectToArray";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import CoursesTable from "../../components/PastCoursesTable/CoursesTable";
import {uiActions} from "../../actions";
import coursesActions from "../../actions/coursesActions";

const mapStateToProps = (state: IStore, ownProps: ICoursesTableContainerProps): ICoursesTableValueProps => {
    const courses: ICourse[] = objectToArray(state.courses);

    return {
        courses,
        isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
        isLoading: state.courses.states.isLoading,
        isDeletingCourse: state.ui.is.deleting.course,
    };
};

const mapDispacthToProps = (dispatch: (action: any) => any | void, props: ICoursesTableContainerProps): ICoursesTableDispatchProps => ({

    onClickEditCourse(id: string) {
        props.history.push('/courses/' + id);
    },

    onClickDeleteCourse(id: string) {
        dispatch(uiActions.openDeleteConfirmationModal(id));
    },

    onCloseDelete() {
        dispatch(uiActions.closeDeleteConfirmationModal());
    },

    onConfirmDelete(course: ICourse) {
        dispatch(coursesActions.deleteCourse(course));
    },

    onClickAddNewCourse(){
        props.history.push('/new-course');
    },

    onFetchCourses(id: string) {
        dispatch(coursesActions.fetchPastCourses(id));
    },
});

export default withRouter((connect(mapStateToProps, mapDispacthToProps) as any)(CoursesTable)) as typeof CoursesTable;