import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { ISubject } from "../../../globals";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

const styles = require('./SubjectForm.pcss');

class SubjectForm extends React.Component<IProps, IState> {


  state: IState = {
    fields: {
        subjectName: '',
        careerYear: 0,
        id: '',
    },
    showPassword: false,
    errors: {
        careerYear: false,
        subjectName: false,
    },
    isNew: true,
    isEditing: true,
  };


  componentDidMount() {
    const { subject, match } = this.props;

    /* If subject was passed as a prop, then set the information for the subject into the fields */
    if (subject) {

      this.setSubject();
    } else {
      if (match.params.id) {
        this.props.onFetchSubject(match.params.id);
      }
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.subject && !prevProps.subject) {
      this.setSubject();
    }
  }

  setSubject = () => {
    const { subjectName, careerYear, id} = this.props.subject as ISubject;
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
          subjectName,
          careerYear,
          id,
      },
      isNew: false,
      isEditing: false,
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
        this.props.onEdit(this.state.fields).then(() => this.props.history.push('/subjects'));
      }
      else {
        this.props.onCreate(this.state.fields).then(() => this.props.history.push('/subjects'));
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
          this.validateName(value)
        );
      case 'careerYear':
        return (
          this.validateCareerYear(value)
        );
      default:
        return true;
    }
  };

  validateName = (value: any): boolean => {
    return value !== '';
  };

  validateCareerYear = (value: any): boolean => {
    return value !== '';
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
      this.props.onCancel();
    } else {
      this.setState({ ...this.state, isEditing: false }, this.setSubject);
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
    this.props.onClickDelete(this.props.subject as ISubject);
  };

  handleCloseDelete = () => {
    this.props.onCloseDelete();
  };

  handleConfirmDelete = () => {
    this.props.onConfirmDelete(this.props.subject as ISubject).then(() => this.props.history.push('/subjects'));
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
      <div className={styles.displayNameDiv}>{`${subjectName ? Object.assign({}, subjectName) : 'New Subject'}`}</div>
    </div>
  };

  render() {
    const { fields, errors } = this.state;

    const { isDeleteConfirmationOpen } = this.props;

    const { isFetchingSubject, isDeleting, isCreating } = this.props;

    if (isFetchingSubject || isDeleting || isCreating) {
      return <div><CircularProgress /></div>
    }

    const readOnly = this.areInputsReadOnly();

    return (
      <div className={styles.NewSubject}>

        {
          isDeleteConfirmationOpen &&
          <DeleteConfirmationDialog
            isLoading={isDeleting}
            userType={'subject'}
            name={`${fields.subjectName} ${fields.careerYear}`}
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
                <InputLabel required htmlFor='subject-career-year'>Career Year</InputLabel>
                <Input id='subject-career-year'
                       value={fields.careerYear}
                       type='number'
                       onChange={this.handleChange('careerYear')}
                       readOnly={readOnly}
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

export default SubjectForm;
