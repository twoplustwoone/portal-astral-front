import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  // MenuItem, Select,
  Typography,
} from '@material-ui/core';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { DeleteConfirmationDialogExam } from "../DeleteConfirmationDialogExam/DeleteConfirmationDialogExam";
import { Redirect, withRouter } from "react-router";
import { updateExam, createExam, getExamById, deleteExam, getAllCourses } from "../../utils/api";
import session from "../../utils/session";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Select from "@material-ui/core/es/Select/Select";

const styles = require('./ExamForm.pcss');

class ExamForm extends React.Component<IProps, IState> {

  state: IState = {
    fields: {
      course: {
        id: '',
        startDate: '',
        endDate: '',
        subject: {
          id: '',
          subjectName: '',
          careerYear: 1,
          requiredSubjects: [],
          students: [],
        },
        courseProfessors: [],
      },
      date: '',
      id: '',
    },
    errors: {},
    isNew: true,
    isEditing: true,
    isFetching: false,
    isCreating: false,
    isDeleting: false,
    isDeleteModalOpen: false,
    allCourses: [],
  };


  componentDidMount() {
    const { match } = this.props;

    if (match.params.id) {
      getExamById(match.params.id).then(this.handleResponse).then(this.setExam).catch(this.redirect);
      this.setState({ isNew: false, isFetching: true });
    } else {
      this.setState({ isNew: true });
    }

    getAllCourses().then(this.handleFetchAllCourses).then(this.setAllCourses);
  }

  handleFetchAllCourses = (response: Response) => {
    return response.json();
  };

  setAllCourses = (courses: ICourse[]) => {
    this.setState({ allCourses: courses });
  };

  redirect = () => {
    this.setState({ redirect: '/exams' });
  };

  handleResponse = (response: Response): Promise<IExam> => {
    if (response.status === 404) {
      throw Error('Course not found');
    }

    return response.json();
  };

  setExam = (exam: IExam) => {
    this.setState({ exam: exam, isNew: false, isEditing: false, isFetching: false }, this.mapExam);
  };

  mapExam = () => {
    const { exam } = this.state;

    if (!exam) {
      return;
    }

    const { course, date, id } = exam;
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        course,
        date,
        id,
      },
    });
  };

  handleChange = (prop: string) => (event: any) => {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [prop]: event.target.value,
      },
    });
  };

  handleCourseChange = () => (event: any) => {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        course: {
          ...this.state.fields.course,
          id: event.target.value,
        },
      },
    });
  };

  handleSubmit = () => {
    if (this.validateAll()) {
      if (!this.state.isNew) {
        console.log(this.state.fields);
        updateExam(this.state.fields).then(() => this.setState({ redirect: '/exams' }));
      }
      else {
        createExam(this.state.fields).then(() => this.setState({ redirect: '/exams' }));
      }
    }
  };

  validateAll = () => {
    const errors: IErrors = {};

    /* Validate all fields and set errors */
    const results: boolean[] = Object.keys(this.state.fields).map((field) => {
      const isValid = this.validate(field, this.state.fields[field]);
      errors[field] = !isValid;
      return isValid;
    });
    const reduce = results.reduce(this.checkBooleans, true);
    /* Update error state */
    this.setState({
      ...this.state,
      errors: errors,
    });
    return reduce;
  };

  checkBooleans = (acc: boolean, elem: boolean) => {
    return acc && elem
  };

  validate = (field: string, value: any): boolean => {
    switch (field) {
      case 'subjectName':
        return (
          this.validatename(value)
        );
      case 'date':
        return (
          this.validateDate(value)
        );
      default:
        return true;
    }
  };

  validatename = (value: any): boolean => {
    return value !== '';
  };

  validateDate = (value: any): boolean => {
    return new Date(value) > new Date();
  };

  areInputsReadOnly = () => {
    const { isEditing } = this.state;
    return !isEditing;
  };

  handleEdit = () => {
    this.setState({ ...this.state, isEditing: true });
  };

  handleCancel = () => {
    if (this.state.isNew) {
      this.setState({ redirect: '/exams' });
    } else {
      this.setState({ isEditing: false }, this.mapExam);
    }
  };

  getHeader = () => {
    if (this.state.isNew) {
      return 'Create exam';
    } else {
      return 'Edit exam';
    }
  };

  handleDeleteClick = () => {
    console.log("you clicked me!");
    this.setState({ isDeleteModalOpen: true });
  };

  handleCloseDelete = () => {
    this.setState({ isDeleteModalOpen: false });
  };

  handleConfirmDelete = () => {
    const exam = this.state.exam;

    if (!exam) {
      return;
    }

    deleteExam(exam.id).then(() => this.setState({ redirect: '/exams' }));
  };

  renderTitle = () => {
    const { isNew } = this.state;
    // const { subject } = this.state.fields;
    return <div>
      {
        !isNew &&
        <div className={styles.deleteButtonDiv}>
          <Button
            variant='contained'
            color='secondary'
            onClick={this.handleDeleteClick}
          >
            DELETE
          </Button>
        </div>
      }
      {/*<div className={styles.displayNameDiv}>{`${subject.subjectName}`}</div>*/}
    </div>
  };

  render() {
    const { fields, errors, isFetching, isDeleteModalOpen, isDeleting, isCreating, redirect } = this.state;
    const userType = session.getUserType();

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    if (userType !== 'Admin') {
      return <Redirect to={'/exams'} />;
    }

    if (isFetching || isDeleting || isCreating) {
      return <div><CircularProgress /></div>
    }

    const readOnly = this.areInputsReadOnly();

    return (
      <div className={styles.NewExam}>

        {
          isDeleteModalOpen &&
          <DeleteConfirmationDialogExam
            isLoading={isDeleting}
            course={this.state.fields.course}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
          />
        }

        <Typography className={styles['New-exam-title']} color='textSecondary'>
          {
            this.getHeader()
          }
        </Typography>
        <Card className={styles['New-exam-box']}>
          <CardHeader title={this.renderTitle()} className={styles.displayName} />
          <CardContent>
            <form className={styles['New-exam-form']}>
              <FormControl className={styles['exam-form-control']} error={errors.course}>
                <InputLabel required htmlFor='exam-course'>Course</InputLabel>
                {
                  <Select
                    value={this.state.fields.course.id}
                    onChange={this.handleCourseChange()}
                    inputProps={{
                      name: 'Course',
                      id: 'exam-course',
                    }}
                    disabled={readOnly}
                  >
                    {
                      this.state.allCourses
                        .filter(s => s.id !== fields.id)
                        .map(s => <MenuItem
                          value={s.id}>{s.subject.subjectName.concat(" ").concat(s.startDate)}</MenuItem>)
                    }
                  </Select>
                }
              </FormControl>

              <FormControl className={styles['exam-form-control']} error={errors.date}>
                <InputLabel required htmlFor='exam-date' shrink>Date</InputLabel>
                <Input id='exam-date'
                       value={this.state.fields.date}
                       onChange={this.handleChange('date')}
                       readOnly={readOnly}
                       type={'date'}
                />
              </FormControl>
            </form>
          </CardContent>

          <CardActions>
            <div className={styles.buttonContainer}>
              {
                readOnly
                  ? <Button
                    variant='contained'
                    color='primary'
                    className={styles['create-exam-button']}
                    onClick={this.handleEdit}
                  >
                    EDIT
                  </Button>
                  : <div className={styles.submitCancelButtons}>
                    <Button
                      variant='outlined'
                      className={styles['create-exam-button']}
                      onClick={this.handleCancel}
                    >
                      CANCEL
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      className={styles['create-exam-button']}
                      onClick={this.handleSubmit}
                    >
                      SAVE
                    </Button>
                  </div>
              }
            </div>
          </CardActions>

        </Card>

      </div>
    );
  }
}

export default withRouter(ExamForm);
