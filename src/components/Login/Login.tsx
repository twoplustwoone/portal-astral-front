import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
  Button,
  Card,
  CardActions,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  FormGroup,
  CardContent,
  CardHeader,
  CircularProgress,
  Fade, Typography,
}
  from "@material-ui/core/";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { login } from "../../utils/api";
import { Redirect } from "react-router";
import session from "../../utils/session";

const styles = require('./Login.pcss');

class Login extends React.Component<IProps, IState> {

  state: IState = {
    fields: {
      email: '',
      password: '',
    },
    errors: {
      email: false,
      password: false,
    },
    login: {
      isLoading: false,
      success: true,
      error: false,
    },
    showPassword: false,
    authenticated: false,
    anchorEl: null,
    loggedUser: {
      id: '',
      lastName: '',
      name: '',
    },
  };

  checkEnter = (event) => {
    if (event.keyCode == 13) {
      this.handleLogIn()
    }
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

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  validate = (field: string, value: any): boolean => {
    switch (field) {
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

  validateEmail = (value: any): boolean => {
    return value !== '' && value.includes('@');
  };

  validatePassword = (value: any): boolean => {
    return !!(value);
  };

  checkBooleans = (acc: boolean, elem: boolean) => {
    return acc && elem
  };

  validateFormsControl = () => {
    const { fields } = this.state;
    const errors: IErrors = {};

    /* Validate all fields and set errors */
    const results: boolean[] = Object.keys(fields).map((field) => {
      const isValid = this.validate(field, fields[field]);
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

  handleLogInSuccess = (response: ILoginResponse) => {
    session.login(response);
    let redirect = '/';
    switch (session.getUserType()) {
      case 'Admin':
        redirect = '/admins';
        break;
      case 'Professor':
        redirect = '/ongoing-courses';
        break;
      case 'Student':
        redirect = '/available-courses';
        break;
    }

    this.setState({ redirect });
  };

  handleResponse = (response: Response): Promise<ILoginResponse> => {
    if (response.status === 401) {
      throw Error('Invalid email/password');
    }

    return response.json();
  };

  handleLogIn = () => {
    const { email, password } = this.state.fields;

    if (this.validateFormsControl()) {
      this.setState({ errorMessage: '' });
      login({ email, password })
        .then(this.handleResponse)
        .then(this.handleLogInSuccess)
        .catch(this.setErrors);
    }
  };

  setErrors = () => {
    this.setState({ errors: { password: true, email: true }, errorMessage: 'Invalid email/password' });
  };


  render() {
    const { fields, errors, login, showPassword, redirect } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return <div className={styles.container}>
      <div className={styles.login}>
        <Card className={styles['card']}>
          <CardHeader className={styles.cardHeader}>
            Iniciar Sesión
          </CardHeader>
          <CardContent>
            <FormGroup className={styles['form-group']}>
              <FormControl className={styles['form-control']} error={errors.email}>
                <InputLabel required htmlFor='email'>E-mail</InputLabel>
                <Input id='email'
                       value={fields.email}
                       onChange={this.handleChange('email')}
                       readOnly={login.isLoading}
                />
              </FormControl>
              <FormControl className={styles['form-control']} error={errors.password}>
                <InputLabel required htmlFor='adornment-password'>Password</InputLabel>
                <Input
                  id='adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  value={fields.password}
                  onChange={this.handleChange('password')}
                  readOnly={login.isLoading}
                  onKeyDown={this.checkEnter}
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
                />

              </FormControl>
            </FormGroup>
          </CardContent>
          <CardActions>
            <div className={styles['buttons-container']}>
              <Fade
                in={login.isLoading}
              >
                <CircularProgress />
              </Fade>
              <Button
                variant='contained'
                color='primary'
                className={styles['login-button']}
                onClick={this.handleLogIn}
                disabled={login.isLoading}
              >
                LOG IN
              </Button>
            </div>
          </CardActions>
          <div><Typography color={'error'}>{this.state.errorMessage}</Typography></div>
        </Card>
      </div>
    </div>
  }
}

export default Login;