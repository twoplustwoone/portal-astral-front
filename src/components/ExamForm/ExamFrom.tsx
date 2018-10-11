import * as React from 'react';
import { IErrors, IProps, IState } from './types';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    Input,
    InputLabel,
    // MenuItem, Select,
    Typography,
} from '@material-ui/core';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { DeleteConfirmationDialogExam } from "../DeleteConfirmationDialogExam/DeleteConfirmationDialogExam";
import { Redirect, withRouter } from "react-router";
import {getAllSubjects, updateExam, createExam, getExamById, deleteExam} from "../../utils/api";
import session from "../../utils/session";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Select from "@material-ui/core/es/Select/Select";

const styles = require('./ExamForm.pcss');

class ExamForm extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            subject: {
                id: '',
                subjectName: '',
                careerYear: 1,
                requiredSubjects: [],
                students: [],
            },
            date: '',
            id: '',
            subjects: [],
        },
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
            getExamById(match.params.id).then(this.handleResponse).then(this.setCourse).catch(this.redirect);
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
        this.setState({ redirect: '/exams' });
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
                updateExam(this.state.fields).then(() => this.setState({ redirect: '/exams' }));
            }
            else {
                createExam(this.state.fields).then(() => this.setState({ redirect: '/exams' }));
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
            case 'schedule':
                return (
                    this.validatename(value)
                );
            default:
                return true;
        }
    };

    validatename = (value: any): boolean => {
        return value !== '';
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
            this.setState({ redirect: '/exams' });
        } else {
            this.setState({ isEditing: false }, this.mapCourse);
        }
    };

    getHeader = () => {
        if (this.state.isNew) {
            return 'Create exam';
        } else {
            return 'Edit exam';
        }
    };

    handleDeleteClick = () => {
        console.log("you clicked me!");
        this.setState({ isDeleteModalOpen: true });
    };

    handleCloseDelete = () => {
        this.setState({ isDeleteModalOpen: false });
    };

    handleConfirmDelete = () => {
        const course = this.state.course;

        if (!course) {
            return;
        }

        deleteExam(course.id).then(() => this.setState({ redirect: '/exams' }));
    };

    renderTitle = () => {
        const { isNew } = this.state;
        const { subject } = this.state.fields;
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
            <div className={styles.displayNameDiv}>{`${subject.subjectName}`}</div>
        </div>
    };

    render() {
        const { fields, errors, isFetching, isDeleteModalOpen, isDeleting, isCreating, redirect } = this.state;
        console.log(fields);
        const userType = session.getUserType();

        if (redirect) {
            return <Redirect to={redirect} />;
        }

        if (userType !== 'Admin') {
            return <Redirect to={'/exams'} />;
        }

        if (isFetching || isDeleting || isCreating) {
            return <div><CircularProgress /></div>
        }

        const readOnly = this.areInputsReadOnly();

        return (
            <div className={styles.NewExam}>

                {
                    isDeleteModalOpen &&
                    <DeleteConfirmationDialogExam
                        isLoading={isDeleting}
                        subject={this.state.fields.subject}
                        handleCloseDelete={this.handleCloseDelete}
                        handleConfirmDelete={this.handleConfirmDelete}
                    />
                }

                <Typography className={styles['New-exam-title']} color='textSecondary'>
                    {
                        this.getHeader()
                    }
                </Typography>
                <Card className={styles['New-exam-box']}>
                    <CardHeader title={this.renderTitle()} className={styles.displayName} />
                    <CardContent>
                        <form className={styles['New-exam-form']}>
                            <FormControl className={styles['exam-form-control']} error={errors.subjects}>
                                <InputLabel required htmlFor='exam-subjects'>Subject</InputLabel>
                                {
                                    <Select
                                        value={this.state.fields.subject.id}
                                        onChange={this.handleSubjectChange()}
                                        inputProps={{
                                            name: 'Exam',
                                            id: 'subject-requiredSubjects',
                                        }}
                                        disabled={readOnly}
                                    >
                                        {
                                            this.state.allSubjects
                                                .filter(s => s.id !== fields.id && fields.subjects.indexOf(s.id) < 0)
                                                .map(s => <MenuItem value={s.id}>{s.subjectName}</MenuItem>)
                                        }
                                    </Select>
                                }
                            </FormControl>

                            <FormControl className={styles['exam-form-control']} error={errors.date}>
                                <InputLabel required htmlFor='exam-time' shrink>Time</InputLabel>
                                <Input id='exam-time'
                                       value={fields.date}
                                       onChange={this.handleChange('date')}
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
                                        className={styles['create-exam-button']}
                                        onClick={this.handleEdit}
                                    >
                                        EDIT
                                    </Button>
                                    : <div className={styles.submitCancelButtons}>
                                        <Button
                                            variant='outlined'
                                            className={styles['create-exam-button']}
                                            onClick={this.handleCancel}
                                        >
                                            CANCEL
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            className={styles['create-exam-button']}
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

export default withRouter(ExamForm);
