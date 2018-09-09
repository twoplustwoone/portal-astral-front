import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import './ProfessorForm.css';
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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class ProfessorForm extends React.Component<IProps, IState> {

  state: IState = {
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    showPassword: false,
    errors: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    },
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
      // TODO dispatch post professor action
    } else {

    }
  };

  validateAll = () => {
    const errors: IErrors = {};

    /* Validate all fields and set errors */
    const results: boolean[] = Object.keys(this.state.fields).map((field) => {
      const result = this.validate(field, this.state.fields[field]);
      errors[field] = result;
      return result;
    });
    const reduce = results.reduce(this.checkBooleans, true);
    /* Update error state */
    this.setState({
      ...this.state,
      errors: errors,
    });
    return reduce
  };

  checkBooleans = (acc: boolean, elem: boolean) => {
    return acc && elem
  };

  validate = (field: string, value: any): boolean => {
    switch (field) {
      case "firstName":
        return (
          this.validateFirstName(value)
        );
      case "lastName":
        return (
          this.validateLastName(value)
        );
      case "email":
        return (
          this.validateEmail(value)
        );
      case "password":
        return (
          this.validatePassword(value)
        );
      default:
        return true;
    }
  };

  validateFirstName = (value: any): boolean => {
    return value == "";
  };

  validateLastName = (value: any): boolean => {
    return value == "";
  };

  validateEmail = (value: any): boolean => {
    return !value.includes("@") || value == "";
  };

  validatePassword = (value: any): boolean => {
    return !(value || !(value.length < 6 || value.length > 20));
  };

  render() {
    return (
      <div className="NewProfessor">
        <Typography className={'New-Professor-title'} color="textSecondary">
          Create professor
        </Typography>

        {/*<h1 className="New-Professor-title">Create professor</h1>*/}
        <Card className="New-Professor-box">
          <CardContent>
            <form className="New-Professor-form">
              <FormControl className="professor-form-control" error={this.state.errors.firstName}>
                <InputLabel required htmlFor="professor-name">First name</InputLabel>
                <Input id="professor-name"
                       value={this.state.fields.firstName}
                       onChange={this.handleChange('firstName')} />
              </FormControl>
              <FormControl className="professor-form-control" error={this.state.errors.lastName}>
                <InputLabel required htmlFor="professor-surname">Last name</InputLabel>
                <Input id="professor-surname"
                       value={this.state.fields.lastName}
                       onChange={this.handleChange('lastName')} />
              </FormControl>
              <FormControl className="professor-form-control" error={this.state.errors.email}>
                <InputLabel required htmlFor="professor-email">E-mail</InputLabel>
                <Input id="professor-email"
                       value={this.state.fields.email}
                       onChange={this.handleChange('email')} />
              </FormControl>
              <FormControl className="professor-form-control" error={this.state.errors.password}>
                {/* LA PASSWORD -> Entre 6 y 20 caracters, una letra, un numero minimo*/}
                <InputLabel required htmlFor="adornment-password">Password</InputLabel>
                <Input
                  id="adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.fields.password}
                  onChange={this.handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className="password-helper-text" id="password-helper-text">Must be between 6 and 20
                  characters with at least one number and one letter</FormHelperText>
              </FormControl>
            </form>
          </CardContent>

          <CardActions>
            <Button variant="contained" color="primary" className="create-professor-button" onClick={this.handleSubmit}>
              SAVE
            </Button>
            <Button variant="outlined" className="create-professor-button">
              CANCEL
            </Button>
          </CardActions>

        </Card>

      </div>
    );
  }
}

export default ProfessorForm;
