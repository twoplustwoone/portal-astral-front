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
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = require('./AdminForm.pcss');

class AdminForm extends React.Component<IProps, IState> {

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
  };

  constructor(props) {
    super(props);
    console.log({ props });
  }

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
      this.props.onSubmit(this.state.fields);
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
        // todo validate file?
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
    return value !== '' && value.length > 6 && value.length < 20;
  };

  render() {
    return (
      <div className={styles.NewAdmin}>
        <Typography className={styles['New-Admin-title']} color='textSecondary'>
          Create Admin
        </Typography>

        {/*<h1 className='New-Admin-title'>Create Admin</h1>*/}
        <Card className={styles['New-Admin-box']}>
          <CardContent>
            <form className={styles['New-Admin-form']}>
              <FormControl className={styles['Admin-form-control']} error={this.state.errors.name}>
                <InputLabel required htmlFor='Admin-name'>First name</InputLabel>
                <Input id='Admin-name'
                       value={this.state.fields.name}
                       onChange={this.handleChange('name')} />
              </FormControl>
              <FormControl className={styles['Admin-form-control']} error={this.state.errors.lastName}>
                <InputLabel required htmlFor='Admin-surname'>Last name</InputLabel>
                <Input id='Admin-surname'
                       value={this.state.fields.lastName}
                       onChange={this.handleChange('lastName')} />
              </FormControl>
              <FormControl className={styles['Admin-form-control']} error={this.state.errors.email}>
                <InputLabel required htmlFor='Admin-email'>E-mail</InputLabel>
                <Input id='Admin-email'
                       value={this.state.fields.email}
                       onChange={this.handleChange('email')} />
              </FormControl>
              <FormControl className={styles['Admin-form-control']} error={this.state.errors.password}>
                {/* LA PASSWORD -> Entre 6 y 20 caracters, una letra, un numero minimo*/}
                <InputLabel required htmlFor='adornment-password'>Password</InputLabel>
                <Input
                  id='adornment-password'
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.fields.password}
                  onChange={this.handleChange('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Toggle password visibility'
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className={styles['password-helper-text']} id='password-helper-text'>
                  Must be between 6 and 20 characters with at least one number and one letter
                </FormHelperText>
              </FormControl>
            </form>
          </CardContent>

          <CardActions>
            <Button
              variant='contained'
              color='primary'
              className={styles['create-Admin-button']}
              onClick={this.handleSubmit}
            >
              SAVE
            </Button>
            <Button variant='outlined' className={styles['create-Admin-button']}>
              CANCEL
            </Button>
          </CardActions>

        </Card>

      </div>
    );
  }
}

export default AdminForm;
