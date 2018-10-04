// @ts-ignore
export { default as App } from './App/App';

export { default as Home } from './Home/Home';

/* ProfessorForm */
export { default as ProfessorForm } from './ProfessorForm/ProfessorForm';
export {
  IDispatchProps as IProfessorFormDispatchProps,
  IValueProps as IProfessorFormValueProps,
  IContainerProps as IProfessorContainerProps,
} from './ProfessorForm/types'


/* StudentForm */
export { default as StudentForm } from './StudentForm/StudentForm';
export {
    IDispatchProps as IStudentFormDispatchProps,
    IValueProps as IStudentFormValueProps,
    IContainerProps as IStudentContainerProps,
} from './StudentForm/types'

/* StudentTable */
export { default as StudentTable } from './student/all-students/StudentTable';
export {
    IDispatchProps as IStudentTableDispatchProps,
    IValueProps as IStudentTableValueProps,
    IContainerProps as IStudentTableContainerProps,
} from './student/types'

/* ProfessorTable */
export { default as ProfessorTable } from './ProfessorTable/ProfessorTable';
export {
  IDispatchProps as IProfessorTableDispatchProps,
  IValueProps as IProfessorTableValueProps,
  IContainerProps as IProfessorTableContainerProps,
} from './ProfessorTable/types'

/* AdminForm */
export { default as AdminForm } from './AdminForm/AdminForm';
export {
  IDispatchProps as IAdminFormDispatchProps,
  IValueProps as IAdminFormValueProps,
} from './AdminForm/types'

/* ProfileForm */
export { default as ProfileForm } from './ProfileForm/ProfileForm';
export {
    IDispatchProps as IProfileDispatchProps,
    IValueProps as IProfileFormValueProps,
    IContainerProps as IProfileContainerProps,
} from './ProfileForm/types'

// Login
export { default as Login } from './Login/Login';
export {
    IDispatchProps as ILoginDispatchProps,
    IValueProps as ILoginValueProps,
} from './Login/types'

/* CourseForm */
export { default as CourseForm } from './CourseForm/CourseForm';
export {
    IDispatchProps as ICourseFormDispatchProps,
    IValueProps as ICourseFormValueProps,
    IContainerProps as ICourseFormContainerProps,
} from './CourseForm/types'