import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { Redirect, withRouter } from "react-router";
import { createProfessor, deleteProfessor, getProfessorById, updateProfessor } from "../../utils/api";
import session from "../../utils/session";

const styles = require('./ProfessorForm.pcss');

class ProfessorForm extends React.Component<IProps, IState> {


  state: IState = {
    fields: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      file: '',
      id: '',
    },
    showPassword: false,
    errors: {
      name: false,
      lastName: false,
      email: false,
      password: false,
      file: false,
    },
    isNew: true,
    isEditing: true,
    isFetching: false,
    isCreating: false,
    isDeleting: false,
    isDeleteModalOpen: false,
  };


  componentDidMount() {
    const { match } = this.props;

    if (match.params.id) {
      getProfessorById(match.params.id).then(this.handleResponse).then(this.setProfessor).catch(this.redirect);
      this.setState({ isNew: false, isFetching: true });
    } else {
      this.setState({ isNew: true });
    }

  }

  redirect = () => {
    this.setState({ redirect: '/professors' });
  };

  handleResponse = (response: Response): Promise<IProfessor> => {
    if (response.status === 404) {
      throw Error('Professor not found');
    }

    return response.json();
  };

  setProfessor = (professor: IProfessor) => {
    this.setState({ professor, isNew: false, isEditing: false, isFetching: false }, this.mapProfessor);
  };

  mapProfessor = () => {
    const { professor } = this.state;

    if (!professor) {
      return;
    }

    const { email, name, lastName, id, password, file } = professor;
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        email,
        name,
        id,
        lastName,
        password,
        file,
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

  handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState((state: any) => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = () => {
    if (this.validateAll()) {
      if (!this.state.isNew) {
        updateProfessor(this.state.fields).then(() => this.setState({ redirect: '/professors' }));
      }
      else {
        createProfessor(this.state.fields).then(() => this.setState({ redirect: '/professors' }));
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
    return value !== '' && value.includes('@') && value.includes('.com');
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
      this.setState({ redirect: '/professors' });
    } else {
      this.setState({ isEditing: false }, this.mapProfessor);
    }
  };

  getHeader = () => {
    if (this.state.isNew) {
      return 'Create professor';
    } else {
      return 'Edit professor';
    }
  };

  handleDeleteClick = () => {
    // this.props.onClickDelete(this.props.professor as IProfessor);
    this.setState({ isDeleteModalOpen: true });
  };

  handleCloseDelete = () => {
    // this.props.onCloseDelete();
    this.setState({ isDeleteModalOpen: false });
  };

  handleConfirmDelete = () => {
    // this.props.onConfirmDelete(this.props.professor as IProfessor).then(() => this.props.history.push('/professors'));
    const professor = this.state.professor;

    if (!professor) {
      return;
    }

    deleteProfessor(professor.id).then(() => this.setState({ redirect: '/professors' }));
  };

  renderTitle = () => {
    const { isNew } = this.state;
    const { name, lastName } = this.state.fields;
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
      <div className={styles.displayNameDiv}>{`${name} ${lastName}`}</div>
    </div>
  };

  render() {
    const { fields, showPassword, errors, isFetching, isDeleteModalOpen, isDeleting, isCreating, redirect } = this.state;

    const userType = session.getUserType();

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    if (userType !== 'Admin') {
      return <Redirect to={'/professors'} />;
    }

    if (isFetching || isDeleting || isCreating) {
      return <div><CircularProgress /></div>
    }

    const readOnly = this.areInputsReadOnly();

    return (
      <div className={styles.NewProfessor}>

        {
          isDeleteModalOpen &&
          <DeleteConfirmationDialog
            isLoading={isDeleting}
            userType={'professor'}
            name={`${fields.name} ${fields.lastName}`}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
          />
        }

        <Typography className={styles['New-Professor-title']} color='textSecondary'>
          {
            this.getHeader()
          }
        </Typography>
        <Card className={styles['New-Professor-box']}>
          <CardHeader title={this.renderTitle()} className={styles.displayName} />
          <CardContent>
            <form className={styles['New-Professor-form']}>
              <FormControl className={styles['professor-form-control']} error={errors.name}>
                <InputLabel required htmlFor='professor-name'>First name</InputLabel>
                <Input id='professor-name'
                       value={fields.name}
                       onChange={this.handleChange('name')}
                       readOnly={readOnly}
                />
              </FormControl>
              <FormControl className={styles['professor-form-control']} error={errors.lastName}>
                <InputLabel required htmlFor='professor-surname'>Last name</InputLabel>
                <Input id='professor-surname'
                       value={fields.lastName}
                       onChange={this.handleChange('lastName')}
                       readOnly={readOnly}
                />
              </FormControl>
              <FormControl className={styles['professor-form-control']} error={errors.email}>
                <InputLabel required htmlFor='professor-email'>E-mail</InputLabel>
                <Input id='professor-email'
                       value={fields.email}
                       onChange={this.handleChange('email')}
                       readOnly={readOnly}
                />
              </FormControl>
              <FormControl className={styles['professor-form-control']} error={errors.file}>
                <InputLabel required htmlFor='professor-email'>File</InputLabel>
                <Input id='professor-file'
                       value={fields.file}
                       onChange={this.handleChange('file')}
                       readOnly={readOnly}
                />
              </FormControl>
              <FormControl className={styles['professor-form-control']} error={errors.password}>
                <InputLabel required htmlFor='adornment-password'>Password</InputLabel>
                <Input
                  id='adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  value={this.state.isEditing ? fields.password : ""}
                  onChange={this.handleChange('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Toggle password visibility'
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  readOnly={readOnly}
                />
                <FormHelperText className={styles['password-helper-text']} id='password-helper-text'>
                  Must be between 6 and 20 characters with at least one number and one letter
                </FormHelperText>
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
                    className={styles['create-professor-button']}
                    onClick={this.handleEdit}
                  >
                    EDIT
                  </Button>
                  : <div className={styles.submitCancelButtons}>
                    <Button
                      variant='outlined'
                      className={styles['create-professor-button']}
                      onClick={this.handleCancel}
                    >
                      CANCEL
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      className={styles['create-professor-button']}
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

export default withRouter(ProfessorForm);
