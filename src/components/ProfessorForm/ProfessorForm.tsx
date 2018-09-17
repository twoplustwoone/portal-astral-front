import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  CardActions,
  CardContent,
  Card,
  FormHelperText,
  Typography,
  CardHeader,
  Dialog,
  DialogTitle, DialogActions, DialogContent, DialogContentText,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { IProfessor } from "../../../globals";

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
  };


  componentDidMount() {
    const { professor, match } = this.props;

    /* If professor was passed as a prop, then set the information for the professor into the fields */
    if (professor) {
      this.setProfessor();
    } else {
      console.log(this.props);
      if (match.params.id) {
        console.log('Fetch!');
        this.props.onFetchProfessor(match.params.id);
      }
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.professor && !prevProps.professor) {
      this.setProfessor();
    }
  }

  setProfessor = () => {
    const { email, name, lastName, file, id } = this.props.professor as IProfessor;
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        email,
        name,
        lastName,
        file,
        id: id,
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

  handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState((state: any) => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = () => {
    if (this.validateAll()) {
        this.handleLoading();
      if (!this.state.isNew) {
        this.props.onEdit(this.state.fields);
        this.handleCancel();
      }
      else {
        this.props.onSubmit(this.state.fields).then(this.props.history.push('/professors'));
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
      this.props.onCancel();
    } else {
      this.setState({ ...this.state, isEditing: false }, this.setProfessor);
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
    this.props.onClickDelete(this.props.professor as IProfessor);
  };

  handleCloseDelete = () => {
    this.props.onCloseDelete();
  };

  handleConfirmDelete = () => {
    this.props.onConfirmDelete(this.props.professor as IProfessor);
    this.props.onSave();
  };

  handleLoading = () => {
    this.props.onLoading(this.props.professor as IProfessor);
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
    const { fields, showPassword, errors } = this.state;

    const { isDeleteConfirmationOpen } = this.props;

    const { isLoadingOpen, isFetchingProfessor } = this.props;

    if (isFetchingProfessor || isLoadingOpen) {
      return <div><CircularProgress /></div>
    }

    const readOnly = this.areInputsReadOnly();

    return (
      <div className={styles.NewProfessor}>

        {
          isDeleteConfirmationOpen &&
          <Dialog open={true}>
            <DialogTitle>Confirm delete "{`${fields.name} ${fields.lastName}`}"</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This will permanently delete the professor {`${fields.name} ${fields.lastName}`} and cannot be
                undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleConfirmDelete} color="secondary" variant='contained'>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        }

        {
          isLoadingOpen &&
          <Dialog open={true}>
            <CircularProgress className={styles['loading']} />
          </Dialog>
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
              {/*todo*/}
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

export default ProfessorForm;
