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
import {IUser, UserType} from "src/globals";
import {IStudent} from "src/globals";

const styles = require('./ProfileForm.pcss');

class ProfileForm extends React.Component<IProps, IState> {


    state: IState = {
        fields: {
            name: '',
            lastName: '',
            email: '',
            password: '',
            id: '',
            file: '',
            birthday: '',
            identificationType: '',
            identification: '',
            address: '',
            careerId: '',
        },
        showPassword: false,
        errors: {
            name: false,
            lastName: false,
            email: false,
            password: false,
            file: false,
        },
        isEditing: true,
        isNew: false,
        userType: '',

    };


    componentDidMount() {
        const { user } = this.props;

        if(user !== undefined){
            this.props.onFetchUser(user.id);
        }

        /* If user was passed as a prop, then set the information for the user into the fields */
        // if (user) {
        //     this.setUser();
        // } else {
        //     if (match.params.id) {
        //         this.props.onFetchUser(match.params.id);
        //     }
        // }
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.user && !prevProps.user) {
            this.setUser();
        }
    }

    setUser = () => {
        const { name, lastName, email, id, password, file, userType } = this.props.user as IUser;
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
                userType,
            },
            isEditing: false,
            isNew: false,
        });
        if (userType &&
            (userType == UserType.STUDENT)) {
                const { birthday, address} = this.props.user as IStudent;
                this.setState({
                    ...this.state,
                    fields: {
                        ...this.state.fields,
                        birthday,
                        address,
                    }
                });
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

    handleSubmit = () => {
        this.props.onEdit(this.state.fields).then(() => this.props.history.push('/'));
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
        this.setState({ ...this.state, isEditing: false }, this.setUser);
    };

    getHeader = () => {
        return 'Your profile';
    };

    handleDeleteClick = () => {
        this.props.onClickDelete(this.props.user as IUser);
    };

    handleCloseDelete = () => {
        this.props.onCloseDelete();
    };

    handleConfirmDelete = () => {
        this.props.onConfirmDelete(this.props.user as IUser).then(() => this.props.history.push('/'));
    };

    renderTitle = () => {
        const { name, lastName } = this.state.fields;
        const { isNew } = this.state;
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

        const { isFetchingUser, isDeleting } = this.props;

        const { userType } = this.state.userType;

        if (isFetchingUser || isDeleting) {
            return <div><CircularProgress /></div>
        }

        const readOnly = this.areInputsReadOnly();

        return (
            <div className={styles.NewUser}>

                {
                    isDeleteConfirmationOpen &&
                    <DeleteConfirmationDialog
                        isLoading={isDeleting}
                        userType={'user'}
                        name={`${fields.name} ${fields.lastName}`}
                        handleCloseDelete={this.handleCloseDelete}
                        handleConfirmDelete={this.handleConfirmDelete}
                    />
                }

                <Typography className={styles['New-User-title']} color='textSecondary'>
                    {
                        'Your profile'
                    }
                </Typography>
                <Card className={styles['New-user-box']}>
                    <CardHeader title={this.renderTitle()} className={styles.displayName} />
                    <CardContent>
                        <form className={styles['New-user-form']}>
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
                                <InputLabel required htmlFor='user-email'>File</InputLabel>
                                <Input id='user-file'
                                       value={fields.file}
                                       onChange={this.handleChange('file')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            {
                                userType && (userType == UserType.STUDENT) &&
                                <FormControl className={styles['user-form-control']} error={errors.birthday}>
                                    <InputLabel required htmlFor='student-birthday'>Birthday</InputLabel>
                                    <Input
                                        id='student-birthday'

                                        value={fields.birthday}
                                        onChange={this.handleChange('birthday')}
                                        readOnly={readOnly}
                                        type={'date'}
                                    />
                                </FormControl>
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
                    }

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

export default ProfileForm;
