import * as React from 'react';
import { Errors, Props, State } from './types';
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
import { updateAdmin, updateProfessor, updateStudent } from "../../utils/api";
import session from "../../utils/session";

const styles = require('./Profile.pcss');

class Profile extends React.Component<Props, State> {


  state: State = {
    fields: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      file: '',
      id: '',
      identificationType: '',
      birthday: '',
      identification: '',
      address: '',
    },
    showPassword: false,
    errors: {},
    isEditing: true,
  };


  componentDidMount() {
    this.fetchCareers();
    const user = session.getUser();
    if (user) {
      this.setUser(user);
    }
  }

  fetchCareers = () => {
    // TODO implement when careers is implemented
  };

  handleResponse = (response: Response): Promise<IUser> => {
    if (response.status === 404) {
      throw Error('User not found');
    }

    return response.json();
  };

  setUser = (user: IUser) => {
    this.setState({ profile: user, isEditing: false }, this.mapUser);
  };

  mapUser = () => {
    const { profile } = this.state;

    if (!profile) {
      return;
    }

    const { email, name, lastName, id, password, file, ...restProps } = profile;
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
        ...restProps,
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
      let update: any;

      switch (session.getUserType()) {
        case 'Admin':
          update = updateAdmin;
          break;
        case 'Professor':
          update = updateProfessor;
          break;
        case 'Student':
          update = updateStudent;
          break;
      }
      update(this.state.fields).then(() => {
        session.updateUser(this.state.fields);
        this.setState({ isEditing: false })
      });
    }
  };

  validateAll = () => {
    const errors: Errors = {};

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
    this.setState({ isEditing: false }, this.mapUser);
  };

  getHeader = () => {
    return 'Edit profile';
  };

  renderTitle = () => {
    const { name, lastName } = this.state.fields;
    return <div>
      <div className={styles.displayNameDiv}>{`${name} ${lastName}`}</div>
    </div>
  };

  render() {
    const { fields, showPassword, errors } = this.state;

    const userType = session.getUserType();

    const readOnly = this.areInputsReadOnly();

    return (
      <div className={styles.NewUser}>

        <Typography className={styles['New-User-title']} color='textSecondary'>
          {
            this.getHeader()
          }
        </Typography>
        <Card className={styles['New-User-box']}>
          <CardHeader title={this.renderTitle()} className={styles.displayName} />
          <CardContent>
            <form className={styles['New-User-form']}>
              <FormControl className={styles['user-form-control']} error={errors.name}>
                <InputLabel required htmlFor='user-name'>First name</InputLabel>
                <Input id='user-name'
                       value={fields.name}
                       onChange={this.handleChange('name')}
                       readOnly={readOnly}
                />
              </FormControl>
              <FormControl className={styles['user-form-control']} error={errors.lastName}>
                <InputLabel required htmlFor='user-surname'>Last name</InputLabel>
                <Input id='user-surname'
                       value={fields.lastName}
                       onChange={this.handleChange('lastName')}
                       readOnly={readOnly}
                />
              </FormControl>
              <FormControl className={styles['user-form-control']} error={errors.email}>
                <InputLabel required htmlFor='user-email'>E-mail</InputLabel>
                <Input id='user-email'
                       value={fields.email}
                       onChange={this.handleChange('email')}
                       readOnly={readOnly}
                />
              </FormControl>
              <FormControl className={styles['user-form-control']} error={errors.file}>
                <InputLabel required htmlFor='user-file'>File</InputLabel>
                <Input id='user-file'
                       value={fields.file}
                       onChange={this.handleChange('file')}
                       readOnly={readOnly}
                />
              </FormControl>
              {
                userType === 'Student' &&
                <div>
                  <FormControl className={styles['user-form-control']} error={errors.identification}>
                    <InputLabel required htmlFor='user-identification'>Identification</InputLabel>
                    <Input id='user-identification'
                           value={fields.identification}
                           onChange={this.handleChange('identification')}
                           readOnly={readOnly}
                    />
                  </FormControl>
                  <FormControl className={styles['user-form-control']} error={errors.identificationType}>
                    <InputLabel required htmlFor='user-identificationType'>Identification type</InputLabel>
                    <Input id='user-identificationType'
                           value={fields.identificationType}
                           onChange={this.handleChange('identificationType')}
                           readOnly={readOnly}
                    />
                  </FormControl>
                  <FormControl className={styles['user-form-control']} error={errors.birthday}>
                    <InputLabel required htmlFor='user-birthday' shrink>Birthday</InputLabel>
                    <Input id='user-birthday'
                           value={fields.birthday}
                           onChange={this.handleChange('birthday')}
                           readOnly={readOnly}
                           type={'date'}
                    />
                  </FormControl>
                  <FormControl className={styles['user-form-control']} error={errors.address}>
                    <InputLabel required htmlFor='user-address' shrink>Address</InputLabel>
                    <Input id='user-address'
                           value={fields.address}
                           onChange={this.handleChange('address')}
                           readOnly={readOnly}
                    />
                  </FormControl>
                </div>
              }
              <FormControl className={styles['user-form-control']} error={errors.password}>
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
                    className={styles['create-user-button']}
                    onClick={this.handleEdit}
                  >
                    EDIT
                  </Button>
                  : <div className={styles.submitCancelButtons}>
                    <Button
                      variant='outlined'
                      className={styles['create-user-button']}
                      onClick={this.handleCancel}
                    >
                      CANCEL
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      className={styles['create-user-button']}
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

export default Profile;
