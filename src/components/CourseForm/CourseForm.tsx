import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    Input,
    InputLabel,
    Typography,
} from '@material-ui/core';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { Redirect, withRouter } from "react-router";
import { deleteCourse, getCourseById, updateCourse , getAllSubjects} from "../../utils/api";
import session from "../../utils/session";

const styles = require('./CourseForm.pcss');

class CourseForm extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            subject: {
                id: '',
                subjectName: '',
                careerYear: 2018,
                requiredSubjects: [],
                students: [],
            },
            startTime: '',
            endTime: '',
            schedule: [],
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
        availableSubjects: [],
    };


    componentDidMount() {
        const { match } = this.props;

        console.log("AAAA");
        getAllSubjects().then(this.handleSubjectsResponse).then(this.setAvailableSubjects).catch(this.redirect);
        if (match.params.id) {
            getCourseById(match.params.id).then(this.handleResponse).then(this.setCourse).catch(this.redirect);
            this.setState({ isNew: false, isFetching: true });
        } else {
            this.setState({ isNew: true });
        }


    }

    redirect = () => {
        this.setState({ redirect: '/courses' });
    };

    handleResponse = (response: Response): Promise<ICourse> => {
        if (response.status === 404) {
            throw Error('Course not found');
        }

        return response.json();
    };

    handleSubjectsResponse = (response: Response): Promise<ISubject[]> => {
        if (response.status === 404) {
            throw Error('Course not found');
        }

        return response.json();
    };

    setCourse = (course: ICourse) => {
        this.setState({ course: course, isNew: false, isEditing: false, isFetching: false }, this.mapCourse);
    };

    setAvailableSubjects = (subjects: ISubject[]) => {
        console.log(subjects);
        this.setState({ availableSubjects: subjects, isNew: false, isEditing: false, isFetching: false }, this.mapSubjects);
    };

    mapCourse = () => {
        const { course } = this.state;

        if (!course) {
            return;
        }

        const { subject, startTime, endTime, id, schedule } = course;
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                subject,
                startTime,
                endTime,
                id,
                schedule,
            },
        });
    };

    mapSubjects = () => {
        const { availableSubjects } = this.state;

        if (!availableSubjects) {
            return;
        }

        this.setState({
            ...this.state,
            availableSubjects,
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

    handleSubmit = () => {
        if (this.validateAll()) {
            if (!this.state.isNew) {
                updateCourse(this.state.fields).then(() => this.setState({ redirect: '/courses' }));
            }
            else {
                updateCourse(this.state.fields).then(() => this.setState({ redirect: '/courses' }));
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
                    this.validatename(value)
                );
            case 'startTime':
                return (
                    this.validateLastName(value)
                );
            case 'endTime':
                return (
                    this.validateLastName(value)
                );
            case 'schedule':
                return (
                    this.validateEmail(value)
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

    areInputsReadOnly = () => {
        const { isEditing } = this.state;
        return !isEditing;
    };

    handleEdit = () => {
        this.setState({ ...this.state, isEditing: true });
    };

    handleCancel = () => {
        if (this.state.isNew) {
            this.setState({ redirect: '/course' });
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
        const { endTime, subject, startTime } = this.state.fields;
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
            <div className={styles.displayNameDiv}>{`${subject.subjectName} ${startTime} ${endTime}`}</div>
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
                    <DeleteConfirmationDialog
                        isLoading={isDeleting}
                        userType={'admin'}
                        name={`${fields.subject.subjectName} ${fields.startTime} ${fields.endTime}`}
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
                            <FormControl className={styles['course-form-control']} error={errors.name}>
                                <InputLabel required htmlFor='course-name'>Course Name</InputLabel>
                                <Input id='course-name'
                                       value={fields.subject.subjectName}
                                       onChange={this.handleChange('subjectName')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={errors.lastName}>
                                <InputLabel required htmlFor='course-surname'>Start Time</InputLabel>
                                <Input id='course-surname'
                                       value={fields.startTime}
                                       onChange={this.handleChange('startTime')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={errors.email}>
                                <InputLabel required htmlFor='course-email'>End Time</InputLabel>
                                <Input id='course-email'
                                       value={fields.endTime}
                                       onChange={this.handleChange('endTime')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={errors.file}>
                                <InputLabel required htmlFor='course-email'>Schedule</InputLabel>
                                <Input id='course-file'
                                       value={fields.schedule}
                                       onChange={this.handleChange('schedule')}
                                       readOnly={readOnly}
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
