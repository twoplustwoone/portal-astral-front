import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, Chip,
  FormControl,
  Input,
  InputLabel, MenuItem, Select,
  Typography,
} from '@material-ui/core';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { Redirect, withRouter } from "react-router";
import { createSubject, deleteSubject, getAllSubjects, getSubjectById, updateSubject } from "../../utils/api";
import session from "../../utils/session";

const styles = require('./SubjectForm.pcss');

class SubjectForm extends React.Component<IProps, IState> {


  state: IState = {
    fields: {
      subjectName: '',
      id: '',
      requiredSubjects: [],
      careerYear: 1,
      courseProfessors: [],
      students: [],
    },
    errors: {},
    isNew: true,
    isEditing: true,
    isFetching: false,
    isCreating: false,
    isDeleting: false,
    isDeleteModalOpen: false,
    allSubjects: [],
  };


  componentDidMount() {
    const { match } = this.props;

    if (match.params.id) {
      getSubjectById(match.params.id).then(this.handleResponse).then(this.setSubject).catch(this.redirect);
      this.setState({ isNew: false, isFetching: true });
    } else {
      this.setState({ isNew: true });
    }

    getAllSubjects().then(this.handleFetchAllSubjects).then(this.setAllSubjects);
  }

  handleFetchAllSubjects = (response: Response) => {
    return response.json();
  };

  setAllSubjects = (subjects: ISubject[]) => {
    this.setState({ allSubjects: subjects });
  };

  redirect = () => {
    this.setState({ redirect: '/subjects' });
  };

  handleResponse = (response: Response): Promise<ISubject> => {
    if (response.status === 404) {
      throw Error('Subject not found');
    }

    return response.json();
  };

  setSubject = (subject: ISubject) => {
    this.setState({ subject, isNew: false, isEditing: false, isFetching: false }, this.mapSubject);
  };

  mapSubject = () => {
    const { subject } = this.state;

    if (!subject) {
      return;
    }

    const { subjectName, id, careerYear, requiredSubjects } = subject;
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        careerYear,
        requiredSubjects,
        subjectName,
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

  handleSubmit = () => {
    if (this.validateAll()) {
      if (!this.state.isNew) {
        updateSubject(this.state.fields).then(() => this.setState({ redirect: '/subjects' }));
      }
      else {
        createSubject(this.state.fields).then(() => this.setState({ redirect: '/subjects' }));
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
      case 'name':
        return (
          this.validatename(value)
        );
      case 'lastName':
        return (
          this.validateLastName(value)
        );
      case 'email':
        return (
          this.validateEmail(value)
        );
      case 'password':
        return (
          this.validatePassword(value)
        );
      default:
        return true;
    }
  };

  validatename = (value: any): boolean => {
    return value !== '';
  };

  validateLastName = (value: any): boolean => {
    return value !== '';
  };

  validateEmail = (value: any): boolean => {
    return value !== '' && value.includes('@');
  };

  validatePassword = (value: any): boolean => {
    return !!(value != "" && value.length >= 6 && value.length < 20 && this.checkLetters(value));
  };

  checkLetters = (value: string): boolean => {
    const words = value.match("[A-z]+");
    const numbers = value.match("[0-9]+");
    return words != undefined && words.length > 0 && numbers != undefined && numbers.length > 0;
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
      this.setState({ redirect: '/subjects' });
    } else {
      this.setState({ isEditing: false }, this.mapSubject);
    }
  };

  getHeader = () => {
    if (this.state.isNew) {
      return 'Create subject';
    } else {
      return 'Edit subject';
    }
  };

  handleDeleteClick = () => {
    // this.props.onClickDelete(this.props.subject as ISubject);
    this.setState({ isDeleteModalOpen: true });
  };

  handleCloseDelete = () => {
    // this.props.onCloseDelete();
    this.setState({ isDeleteModalOpen: false });
  };

  handleConfirmDelete = () => {
    // this.props.onConfirmDelete(this.props.subject as ISubject).then(() => this.props.history.push('/courses'));
    const subject = this.state.subject;

    if (!subject) {
      return;
    }

    deleteSubject(subject.id).then(() => this.setState({ redirect: '/subjects' }));
  };

  renderTitle = () => {
    const { isNew } = this.state;
    const { subjectName } = this.state.fields;
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
      <div className={styles.displayNameDiv}>{subjectName}</div>
    </div>
  };

  handleDeleteChip = (id: string) => {
    const { requiredSubjects } = this.state.fields;
    const newArray = requiredSubjects.filter(s => s !== id);
    this.setState({ ...this.state, fields: { ...this.state.fields, requiredSubjects: newArray } });
  };

  handleAddChip = (event: any) => {
    // TODO check this
    const { requiredSubjects } = this.state.fields;
    requiredSubjects.push(event.target.value);
    this.setState({ ...this.state, fields: { ...this.state.fields, requiredSubjects } });
  };

  render() {
    const { fields, errors, isFetching, isDeleteModalOpen, isDeleting, isCreating, redirect } = this.state;

    const userType = session.getUserType();

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    if (userType !== 'Admin') {
      return <Redirect to={'/subjects'} />;
    }

    if (isFetching || isDeleting || isCreating) {
      return <div><CircularProgress /></div>
    }

    const readOnly = this.areInputsReadOnly();

    return (
      <div className={styles.NewSubject}>

        {
          isDeleteModalOpen &&
          <DeleteConfirmationDialog
            isLoading={isDeleting}
            userType={'subject'}
            name={`${fields.subjectName}`}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
          />
        }

        <Typography className={styles['New-Subject-title']} color='textSecondary'>
          {
            this.getHeader()
          }
        </Typography>
        <Card className={styles['New-Subject-box']}>
          <CardHeader title={this.renderTitle()} className={styles.displayName} />
          <CardContent>
            <form className={styles['New-Subject-form']}>
              <FormControl className={styles['subject-form-control']} error={errors.subjectName}>
                <InputLabel required htmlFor='subject-name'>Name</InputLabel>
                <Input id='subject-name'
                       value={fields.subjectName}
                       onChange={this.handleChange('subjectName')}
                       readOnly={readOnly}
                />
              </FormControl>
              <FormControl className={styles['subject-form-control']} error={errors.careerYear}>
                <InputLabel required htmlFor='subject-year'>Year</InputLabel>
                <Input id='subject-year'
                       value={fields.careerYear}
                       onChange={this.handleChange('careerYear')}
                       readOnly={readOnly}
                       type={'number'}
                />
              </FormControl>
              <FormControl className={styles['subject-form-control']} error={errors.requiredSubjects}>
                <InputLabel required htmlFor='subject-requiredSubjects'>Correlatives</InputLabel>
                {
                  <Select
                    value={undefined}
                    onChange={this.handleAddChip}
                    inputProps={{
                      name: 'Correlativas',
                      id: 'subject-requiredSubjects',
                    }}
                    disabled={readOnly}
                  >
                    {
                      this.state.allSubjects
                        .filter(s => s.id !== fields.id && fields.requiredSubjects.indexOf(s.id) < 0)
                        .map(s => <MenuItem value={s.id}>{s.subjectName}</MenuItem>)
                    }
                  </Select>
                }
                <div style={{ display: 'flex' }}>
                  {
                    fields.requiredSubjects.map((val: string, i) => {

                      const subject = this.state.allSubjects.find(s => s.id === val);

                      if (!subject) {
                        return null;
                      }

                      return <Chip
                        key={`${val}-${i}`}
                        label={subject.subjectName}
                        onDelete={readOnly ? undefined : () => this.handleDeleteChip(val)}
                      />
                    })
                  }
                </div>
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
                    className={styles['create-subject-button']}
                    onClick={this.handleEdit}
                  >
                    EDIT
                  </Button>
                  : <div className={styles.submitCancelButtons}>
                    <Button
                      variant='outlined'
                      className={styles['create-subject-button']}
                      onClick={this.handleCancel}
                    >
                      CANCEL
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      className={styles['create-subject-button']}
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

export default withRouter(SubjectForm);
