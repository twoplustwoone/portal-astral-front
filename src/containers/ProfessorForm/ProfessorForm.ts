import { connect } from 'react-redux';
import { IStore } from '../../reducers';
import { ProfessorForm, IProfessorFormDispatchProps, IProfessorFormValueProps } from '../../components';
import { professorActions } from "../../actions";

const mapStateToProps = (state: IStore): IProfessorFormValueProps => {
  console.log('Is creating professor?');
  console.log(state.ui.is.creating.professor);
  return {};
};

const mapDispatchToProps = (dispatch: (action: any) => any | void): IProfessorFormDispatchProps => ({
  onSubmit: function (professor: IProfessor) {
    dispatch(professorActions.createProfessor(professor));
  },
});

export default (connect(mapStateToProps, mapDispatchToProps) as any)(ProfessorForm) as typeof ProfessorForm;