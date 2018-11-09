import * as React from 'react';
import { Future, Option } from "prelude.ts";

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
    InputLabel, Snackbar,
    Typography,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { Redirect, withRouter } from "react-router";
import { createAdmin, deleteAdmin, getAdminById, getAllAdmins, updateAdmin } from "../../utils/api";
import session from "../../utils/session";
import { array, succeed } from "jsonous";
import { Close } from "@material-ui/icons";

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
        isNew: true,
        isEditing: true,
        isFetching: false,
        isCreating: false,
        isDeleting: false,
        isDeleteModalOpen: false,
        adminsAmount: Option.none(),
        isSnackbarOpen: false,
    };


    componentDidMount() {
        const { match } = this.props;

        requestAdminsAmount.onSuccess(adminsAmount => this.setState({ adminsAmount: Option.some(adminsAmount) }))

        if (match.params.id) {
            getAdminById(match.params.id).then(this.handleResponse).then(this.setAdmin).catch(this.redirect);
            this.setState({ isNew: false, isFetching: true });
        } else {
            this.setState({ isNew: true });
        }

    }

    redirect = () => {
        this.setState({ redirect: '/admins' });
    };

    handleResponse = (response: Response): Promise<IAdmin> => {
        if (response.status === 404) {
            throw Error('Admin not found');
        }

        return response.json();
    };

    setAdmin = (admin: IAdmin) => {
        this.setState({ admin, isNew: false, isEditing: false, isFetching: false }, this.mapAdmin);
    };

    mapAdmin = () => {
        const { admin } = this.state;

        if (!admin) {
            return;
        }

        const { email, name, lastName, id, password, file } = admin;
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
                updateAdmin(this.state.fields).then(() => this.setState({ redirect: '/admins' }));
            } else {
                createAdmin(this.state.fields).then(() => this.setState({ redirect: '/admins' }));
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
            this.setState({ redirect: '/admins' });
        } else {
            this.setState({ isEditing: false }, this.mapAdmin);
        }
    };

    getHeader = () => {
        if (this.state.isNew) {
            return 'Create admin';
        } else {
            return 'Edit admin';
        }
    };

    handleDeleteClick = () => {

        this.state.adminsAmount
            .map(a => a > 1)
            .getOrElse(false)
            ?
            this.setState({ isDeleteModalOpen: true })
            :
            this.setState({ isSnackbarOpen: true })

        // this.props.onClickDelete(this.props.admin as IAdmin);
    };

    handleCloseDelete = () => {
        // this.props.onCloseDelete();
        this.setState({ isDeleteModalOpen: false });
    };

    handleConfirmDelete = () => {
        // this.props.onConfirmDelete(this.props.admin as IAdmin).then(() => this.props.history.push('/admins'));
        const admin = this.state.admin;

        if (!admin) {
            return;
        }

        deleteAdmin(admin.id).then(() => this.setState({ redirect: '/admins' }));
    };

    private handleSnackbarClose = () => {
        this.setState({ isSnackbarOpen: false })
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
            return <Redirect to={redirect}/>;
        }

        if (userType !== 'Admin') {
            return <Redirect to={'/admins'}/>;
        }

        if (isFetching || isDeleting || isCreating) {
            return <div><CircularProgress/></div>
        }

        const readOnly = this.areInputsReadOnly();

        return (
            <div className={styles.NewAdmin}>

                {
                    isDeleteModalOpen &&
                    <DeleteConfirmationDialog
                        isLoading={isDeleting}
                        userType={'admin'}
                        name={`${fields.name} ${fields.lastName}`}
                        handleCloseDelete={this.handleCloseDelete}
                        handleConfirmDelete={this.handleConfirmDelete}
                    />
                }

                <Typography className={styles['New-Admin-title']} color='textSecondary'>
                    {
                        this.getHeader()
                    }
                </Typography>
                <Card className={styles['New-Admin-box']}>
                    <CardHeader title={this.renderTitle()} className={styles.displayName}/>
                    <CardContent>
                        <form className={styles['New-Admin-form']}>
                            <FormControl className={styles['admin-form-control']} error={errors.name}>
                                <InputLabel required htmlFor='admin-name'>First name</InputLabel>
                                <Input id='admin-name'
                                       value={fields.name}
                                       onChange={this.handleChange('name')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl className={styles['admin-form-control']} error={errors.lastName}>
                                <InputLabel required htmlFor='admin-surname'>Last name</InputLabel>
                                <Input id='admin-surname'
                                       value={fields.lastName}
                                       onChange={this.handleChange('lastName')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl className={styles['admin-form-control']} error={errors.email}>
                                <InputLabel required htmlFor='admin-email'>E-mail</InputLabel>
                                <Input id='admin-email'
                                       value={fields.email}
                                       onChange={this.handleChange('email')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl className={styles['admin-form-control']} error={errors.file}>
                                <InputLabel htmlFor='admin-file'>File</InputLabel>
                                <Input id='admin-file'
                                       value={fields.file}
                                       onChange={this.handleChange('file')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl className={styles['admin-form-control']} error={errors.password}>
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
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
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
                                        className={styles['create-admin-button']}
                                        onClick={this.handleEdit}
                                    >
                                        EDIT
                                    </Button>
                                    : <div className={styles.submitCancelButtons}>
                                        <Button
                                            variant='outlined'
                                            className={styles['create-admin-button']}
                                            onClick={this.handleCancel}
                                        >
                                            CANCEL
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            className={styles['create-admin-button']}
                                            onClick={this.handleSubmit}
                                        >
                                            SAVE
                                        </Button>
                                    </div>
                            }
                        </div>
                    </CardActions>

                </Card>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.isSnackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Last administrator cannot be deleted</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleSnackbarClose}
                        >
                            <Close/>
                        </IconButton>,
                    ]}
                />

            </div>
        );
    }


}

const requestAdminsAmount: Future<number> = Future.of(getAllAdmins())
    .flatMap(res => Future.of(res.json()))
    .map(json => array(succeed({})).decodeJson(JSON.stringify(json)))
    .flatMap(decoded => decoded.cata({
        Err: err => Future.failed(`Decoder error ${err}`),
        Ok: array => Future.ok(array.length),
    }))

export default withRouter(AdminForm);
