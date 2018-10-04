import {connect} from "react-redux";
import {
    ICourseFormDispatchProps,
    ICourseFormValueProps,
    ICourseFormContainerProps,
} from '../../components';
import {objectToArray} from "../../helpers/objectToArray";
import {withRouter} from "react-router";
import {IStore} from "../../reducers";
import CourseForm from "../../components/CourseForm/CourseForm";
import courseActions from "../../actions/courseActions";
import {ISubject} from "../../../globals";
import {uiActions} from "../../actions";

const mapStateToProps = (state: IStore, ownProps: ICourseFormContainerProps): ICourseFormValueProps => {
    const subjects: ISubject[] = objectToArray(state.subjects);

    return {
        subjects,
        isLoading: state.ui.is.loading.professors,
    };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props: ICourseFormContainerProps): ICourseFormDispatchProps => ({

    onFetchSubjects() {
        dispatch(courseActions.fetchSubjects());
    },

    onClose(){
        dispatch(uiActions.closeDeleteConfirmationModal());
    },

});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(CourseForm)) as typeof CourseForm;