import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
    Button,
    Card,
    CardActions,
    // CardContent,
    // CardHeader,
    // FormControl,
    // Input,
    // InputLabel,
    Typography,
} from '@material-ui/core';
// import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/es/ListItemAvatar/ListItemAvatar";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import Input from "@material-ui/core/es/Input/Input";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";

const styles = require('./CourseForm.pcss');

class CourseForm extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            subjectName: '',
            startDate: '',
            endDate: '',
        },
        errors: {
            endDate: false,
            startDate: false,
            subjectName: false,
        },
        mobileOpen:false,
        anchorEl: null,
        isNew: true,
        selectedValue: ' ',
        subjects: [],
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

    componentDidMount() {
        // this.props.onFetchSubjects();
    }

    validateAll = () => {
        const errors: IErrors = {};

        /* Validate all fields and set errors */
        const results: boolean[] = Object.keys(this.state.fields).map((field) => {
            const isValid = this.validate(field, this.state.fields[field], this.state.fields[field+1]);
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

    validate = (field: string, value1: any, value2: any): boolean => {
        switch (field) {
            case 'endDate':
                return (
                    this.validateDate(value1, value2)
                );

            case 'subjectName':
                return (
                    this.validateName(value1)
                );
            default:
                return true;
        }
    };

    validateDate = (start: any, end: any): boolean => {
        return end > start;
    };

    validateName = (value: any): boolean => {
        return value !== ' ';
    };

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    handleClickOpen = () => {
        this.setState({
            mobileOpen: true,
        });
    };

    handleCloseWrapped = value => {
        this.setState({ selectedValue: value, mobileOpen: false });
    };

    render() {

        const { subjects = [] } = this.props;
        // const subjects = [{subjectName: "matematica"}, {subjectName: "lengua"}, {subjectName: "cs sociales"}];
        console.log(subjects[0]);

        return (
            <div className={styles.NewCourse}>

                <Typography className={styles['New-course-title']} color='textSecondary'>
                    Create course
                </Typography>
                <Card className={styles['New-course-box']}>

                    {/*<DialogTitle> Here you choose the subject </DialogTitle>*/}

                    <div className={styles['subject-name']}>

                        <Button onClick={this.handleClickOpen}>Select subject</Button>
                        <Dialog
                            open={this.state.mobileOpen}
                            onClose={this.handleClose}
                        />


                        <div>

                            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.mobileOpen} >
                                <DialogTitle id="simple-dialog-title">Subjects</DialogTitle>
                                <div>
                                    <List>
                                        {subjects.map(subject => (
                                            <ListItem button onClick={() => this.handleListItemClick(subject)} key={subject.subjectName}>
                                                <ListItemAvatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={subject.subjectName} />
                                            </ListItem>
                                        ))}

                                        {/*{emails.map(email => (*/}
                                            {/*<ListItem button onClick={() => this.handleListItemClick(email)} key={email}>*/}
                                                {/*<ListItemAvatar>*/}
                                                    {/*<Avatar className={classes.avatar}>*/}
                                                        {/*<PersonIcon />*/}
                                                    {/*</Avatar>*/}
                                                {/*</ListItemAvatar>*/}
                                                {/*<ListItemText primary={email} />*/}
                                            {/*</ListItem>*/}
                                        {/*))}*/}
                                    </List>
                                </div>
                            </Dialog>
                        </div>

                    </div>


                    <CardContent>
                        <form className={styles['New-Subject-form']}>
                            <FormControl className={styles['course-form-control']} error={this.state.errors.startDate}>
                                <Input
                                    id='course-start-date'
                                    value={this.state.fields.startDate}
                                    onChange={this.handleChange('startDate')}
                                    type={'date'}
                                />
                                <FormHelperText className={styles['password-helper-text']} id='date-helper-text'>
                                    Start date
                                </FormHelperText>
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={this.state.errors.endDate}>
                                <Input
                                    id='course-end-date'
                                    value={this.state.fields.endDate}
                                    onChange={this.handleChange('endDate')}
                                    type={'date'}
                                />
                                <FormHelperText className={styles['password-helper-text']} id='date-helper-text'>
                                    End date
                                </FormHelperText>
                            </FormControl>
                        </form>
                    </CardContent>

                    <CardActions>
                        <div className={styles.buttonContainer}>
                            <div className={styles.submitCancelButtons}>
                                <Button
                                    variant='outlined'
                                    className={styles['create-course-button']}
                                    // onClick={this.handleCancel}
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={styles['create-course-button']}
                                    // onClick={this.handleSubmit}
                                >
                                    SAVE
                                </Button>
                            </div>
                        </div>
                    </CardActions>

                </Card>

            </div>
        );
    }
}

export default CourseForm;