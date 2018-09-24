import * as React from 'react';
import {IErrors, IProps, IState} from './types';
import {
    Button,
    Card,
    CardActions,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Toolbar,
    Grid,
    FormGroup,
    CardContent,
    CardHeader,
    CircularProgress,
    Fade,
    AppBar,
    Typography,
    Menu,
    MenuItem,
}
    from "@material-ui/core/";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';

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
        loggedUser: {
            id: '',
            name: '',
            lastName: '',
        },
        login: {
            isLoading: false,
            success: true,
            error: false,
        },
        showPassword: false,
        authenticated: false,
        anchorEl: null,
    };

    validators: Validators;

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
        this.setState((state: any) => ({showPassword: !state.showPassword}));
    };

    handleMenu = (event: any) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    validateFormsControl = () => {
        const errors: IErrors = {};

        /* Validate all fields and set errors */
        const results: boolean[] = Object.keys(this.state.fields).map((field) => {
            const isValid = this.validators.validate(field, this.state.fields[field]);
            errors[field] = !isValid;
            return isValid;
        });
        const reduce = results.reduce(this.validators.checkBooleans, true);
        /* Update error state */
        this.setState({
            ...this.state,
            errors: errors,
        });
        return reduce;
    };

    login = () => {
        if (this.validateFormsControl()) {
            // const {email,password} = this.state.fields;
            // this.props.onFetchUser(email,password);
        }
    };


    render() {
        const {fields, errors,loggedUser,login, showPassword, authenticated, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const openSnackBar = Boolean(login.success);

        return <div className={styles.login}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit" className={styles.grow}>
                        PORTAL ASTRAL
                    </Typography>
                    <div>
                        {authenticated ? (
                            <div>
                                <div>
                                    {loggedUser.name} {loggedUser.lastName}
                                </div>
                                <IconButton className={styles.menuButton}
                                            color="inherit"
                                            aria-label="Menu"
                                            onClick={this.handleMenu}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        ) : <div/>}
                    </div>

                </Toolbar>
            </AppBar>
            <Grid container spacing={24}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
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
                                           readOnly = {login.isLoading}
                                    />
                                </FormControl>
                                <FormControl className={styles['form-control']} error={errors.password}>
                                    <InputLabel required htmlFor='adornment-password'>Password</InputLabel>
                                    <Input
                                        id='adornment-password'
                                        type={showPassword ? 'text' : 'password'}
                                        value={fields.password}
                                        onChange={this.handleChange('password')}
                                        readOnly = {login.isLoading}
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
                                    />

                                </FormControl>
                            </FormGroup>
                        </CardContent>
                        <CardActions>
                            <div className={styles['buttons-container']}>
                                <Fade
                                    in={login.isLoading}
                                >
                                    <CircularProgress/>
                                </Fade>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={styles['login-button']}
                                    onClick={this.login}
                                    disabled={login.isLoading}
                                >
                                    LOG IN
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>


            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <div>
                SNACK BAR
                </div>
            </Snackbar>

        </div>
    }
}

export default Login;