import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    Input,
    InputLabel, MenuItem, Select,
    Typography,
} from '@material-ui/core';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { Redirect, withRouter } from "react-router";
import { createCourse, deleteCourse, getCourseById, updateCourse , getAllSubjects} from "../../utils/api";
import session from "../../utils/session";
import {DeleteConfirmationDialogCourse} from "../DeleteConfirmationDialogCourse/DeleteConfirmationDialogCourse";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";

const styles = require('./CourseForm.pcss');

class CourseForm extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            subject: {
                id: '',
                subjectName: '',
                careerYear: 1,
                requiredSubjects: [],
                students: [],
            },
            startDate: '',
            endDate: '',
            id: '',
            requiredSubjects: [],
            enrolled: [],
        },
        showPassword: false,
        errors: {},
        isNew: true,
        isEditing: true,
        isFetching: false,
        isCreating: false,
        isDeleting: false,
        isDeleteModalOpen: false,
        allSubjects: [],
    };


    componentDidMount() {
        const { match } = this.props;

        if (match.params.id) {
            getCourseById(match.params.id).then(this.handleResponse).then(this.setCourse).catch(this.redirect);
            this.setState({ isNew: false, isFetching: true });
        } else {
            this.setState({ isNew: true });
        }

        getAllSubjects().then(this.handleFetchAllSubjects).then(this.setAllSubjects);
    }

    handleFetchAllSubjects = (response: Response) => {
        return response.json();
    };

    setAllSubjects = (subjects: ISubject[]) => {
        this.setState({ allSubjects: subjects });
    };

    redirect = () => {
        this.setState({ redirect: '/courses' });
    };

    handleResponse = (response: Response): Promise<ICourse> => {
        if (response.status === 404) {
            throw Error('Course not found');
        }

        return response.json();
    };

    setCourse = (course: ICourse) => {
        this.setState({ course: course, isNew: false, isEditing: false, isFetching: false }, this.mapCourse);
    };

    mapCourse = () => {
        const { course } = this.state;

        if (!course) {
            return;
        }

        const { subject, startDate, endDate, id } = course;
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                subject,
                startDate,
                endDate,
                id,
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

    handleSubjectChange = () => (event: any) => {
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                subject: {
                    ...this.state.fields.subject,
                    id: event.target.value,
                },
            },
        });
    };

    handleSubmit = () => {
        if (this.validateAll()) {
            if (!this.state.isNew) {
                updateCourse(this.state.fields).then(() => this.setState({ redirect: '/courses' }));
            }
            else {
                createCourse(this.state.fields).then(() => this.setState({ redirect: '/courses' }));
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
            case 'subjectName':
                return (
                    this.validateName(value)
                );
            case 'startDate':
                return(
                    this.validateStartDate(value)
                );
            case 'endDate':
                return(
                    this.validateEndDate(value)
                );
            default:
                return true;
        }
    };

    validateName = (value: any): boolean => {
        return value !== '';
    };

    validateStartDate = (value: any): boolean => {
        const today = new Date();
        return value >= today.toISOString().substr(0,10);
    };

    validateEndDate = (value: any): boolean => {
        const { startDate } = this.state.fields;
        return startDate <= value;
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
            this.setState({ redirect: '/courses' });
        } else {
            this.setState({ isEditing: false }, this.mapCourse);
        }
    };

    getHeader = () => {
        if (this.state.isNew) {
            return 'Create course';
        } else {
            return 'Edit course';
        }
    };

    handleDeleteClick = () => {
        // this.props.onClickDelete(this.props.course as ICourse);
        this.setState({ isDeleteModalOpen: true });
    };

    handleCloseDelete = () => {
        // this.props.onCloseDelete();
        this.setState({ isDeleteModalOpen: false });
    };

    handleConfirmDelete = () => {
        // this.props.onConfirmDelete(this.props.course as ICourse).then(() => this.props.history.push('/courses'));
        const course = this.state.course;

        if (!course) {
            return;
        }

        deleteCourse(course.id).then(() => this.setState({ redirect: '/courses' }));
    };

    renderTitle = () => {
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
            {/*<div className={styles.displayNameDiv}>{`${this.state.fields.subject.subjectName}`}</div>*/}
        </div>
    };

    render() {
        const { fields, errors, isFetching, isDeleteModalOpen, isDeleting, isCreating, redirect } = this.state;

        const userType = session.getUserType();

        if (redirect) {
            return <Redirect to={redirect} />;
        }

        if (userType !== 'Admin') {
            return <Redirect to={'/courses'} />;
        }

        if (isFetching || isDeleting || isCreating) {
            return <div><CircularProgress /></div>
        }

        const readOnly = this.areInputsReadOnly();

        return (
            <div className={styles.NewCourse}>

                {
                    isDeleteModalOpen &&
                    <DeleteConfirmationDialogCourse
                        isLoading={isDeleting}
                        course={this.state.fields}
                        subject={this.state.fields.subject}
                        handleCloseDelete={this.handleCloseDelete}
                        handleConfirmDelete={this.handleConfirmDelete}
                    />
                }

                <Typography className={styles['New-Course-title']} color='textSecondary'>
                    {
                        this.getHeader()
                    }
                </Typography>
                <Card className={styles['New-Course-box']}>
                    <CardHeader title={this.renderTitle()} className={styles.displayName} />
                    <CardContent>
                        <form className={styles['New-Course-form']}>
                            <FormControl className={styles['course-form-control']} error={errors.requiredSubjects}>
                                <InputLabel required htmlFor='subject-requiredSubjects'>Subject</InputLabel>
                                {
                                    <Select
                                        value={this.state.fields.subject.id}
                                        onChange={this.handleSubjectChange()}
                                        inputProps={{
                                            name: 'Course',
                                            id: 'subject-requiredSubjects',
                                        }}
                                        disabled={readOnly}
                                    >
                                        {
                                            this.state.allSubjects
                                                .filter(s => s.id !== fields.id && fields.requiredSubjects.indexOf(s.id) < 0)
                                                .map(s => <MenuItem key={s.id} value={s.id}>{s.subjectName}</MenuItem>)
                                        }
                                    </Select>
                                }
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={errors.startDate}>
                                <InputLabel required htmlFor='course-startDate' shrink>Start Date</InputLabel>
                                <Input id='course-startDate'
                                       value={fields.startDate}
                                       onChange={this.handleChange('startDate')}
                                       readOnly={readOnly}
                                       type={'date'}
                                />
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={errors.endDate}>
                                <InputLabel required htmlFor='course-endDate' shrink>End Date</InputLabel>
                                <Input id='course-endDate'
                                       value={fields.endDate}
                                       onChange={this.handleChange('endDate')}
                                       readOnly={readOnly}
                                       type={'date'}
                                />
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
                                        className={styles['create-course-button']}
                                        onClick={this.handleEdit}
                                    >
                                        EDIT
                                    </Button>
                                    : <div className={styles.submitCancelButtons}>
                                        <Button
                                            variant='outlined'
                                            className={styles['create-course-button']}
                                            onClick={this.handleCancel}
                                        >
                                            CANCEL
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            className={styles['create-course-button']}
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

export default withRouter(CourseForm);
