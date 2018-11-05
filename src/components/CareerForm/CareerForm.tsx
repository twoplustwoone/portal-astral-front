import * as React from 'react'
import {IProps, IState} from './types';
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    Button,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    Input,
    InputLabel, MenuItem, Select,
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import {DeleteOutline} from "@material-ui/icons";
import {getAllSubjects} from "../../utils/api";
import * as CareerService from "./CareerServices";

const styles = require('./CareerForm.pcss');

class CareerForm extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            id: '',
            careerName: '',
            careerSubjects: [],
        },
        errors: {
            careerName: false,
        },
        isNew: true,
        isEditing: true,
        isFetching: false,
        isCreating: false,
        isDeleting: false,
        isDeleteModalOpen: false,
        allSubjects: [],
    };

    componentDidMount() {
        const {match} = this.props;

        if (match.params.id) {
            CareerService.getCareerByID(match.params.id)
                .then(this.handleResponse)
                .then(this.setCareer)
                .catch(this.redirect);
            this.setState({isNew: false, isFetching: true});
        } else {
            this.setState({isNew: true});
        }

        this.fetchAllSubjects();
    }

    fetchAllSubjects = () => {
        getAllSubjects().then(res => {
            return res.json()
        }).then((subjects: ISubject[]) => {
            return this.setState({
                allSubjects: subjects
                    .filter(s =>
                        !(this.state.fields.careerSubjects.indexOf(s.id) > -1)),
            });
        });

    };

    handleResponse = (response: Response): Promise<ICareer> => {
        if (response.status === 404) {
            throw Error('Career not found');
        }

        return response.json();
    };

    setCareer = (career: ICareer) => {
        this.setState(
            {
                career,
                isNew: false,
                isEditing: false,
                isFetching: false,
            },
            this.mapCareer,
        )

    };

    mapCareer = () => {
        const {career} = this.state;

        if (!career) {
            return;
        }

        const {id, careerName, careerSubjects} = career;
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                id,
                careerName,
                careerSubjects,
            },
        });
    };

    redirect = () => {
        this.setState({
            redirect: '/careers',
        })
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

    handleCloseDelete = () => {
        // this.props.onCloseDelete();
        this.setState({isDeleteModalOpen: false});
    };

    handleConfirmDelete = () => {
        // this.props.onConfirmDelete(this.props.career as ICareer).then(() => this.props.history.push('/careers'));
        const career = this.state.career;

        if (!career) {
            return;
        }

        CareerService.deleteCareer(career.id)
            .then(() => {
                this.setState({redirect: '/careers'})
            });
    };

    handleDeleteClick = () => {
        // this.props.onClickDelete(this.props.career as ICareer);
        this.setState({isDeleteModalOpen: true});
    };

    handleSubmit = () => {
        if (!this.state.isNew) {
            CareerService.updateCareer(this.state.fields)
                .then(() => this.setState({redirect: '/careers'}));
        }
        else {
            CareerService.createCareer(this.state.fields)
                .then(() => this.setState({redirect: '/careers'}));
        }
    };

    handleEdit = () => {
        this.setState({...this.state, isEditing: true});
    };

    handleCancel = () => {
        if (this.state.isNew) {
            this.setState({redirect: '/careers'});
        } else {
            this.setState({isEditing: false}, this.mapCareer);
        }
    };

    handleAddTable = (event: any) => {
        const {careerSubjects} = this.state.fields;
        careerSubjects.push(event.target.value);
        this.setState({...this.state, fields: {...this.state.fields, careerSubjects}});
    };

    handleRemoveFromTable = (id: string) => {
        const {careerSubjects} = this.state.fields;
        const subjectsRemove = careerSubjects.filter((subId) => subId != id);
        this.setState({...this.state, fields: {...this.state.fields, careerSubjects: subjectsRemove}});
    };

    areInputsReadOnly = () => {
        const {isEditing} = this.state;
        return !isEditing;
    };

    renderTitle = () => {
        const {isNew} = this.state;
        const {careerName} = this.state.fields;
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
            <div className={styles.displayNameDiv}>{`${careerName}`}</div>
        </div>
    };

    render() {
        // const {fields, errors, isFetching, isDeleteModalOpen, isDeleting, isCreating} = this.state;
        const {fields, errors, isFetching, isDeleting, isCreating} = this.state;

        const readOnly = this.areInputsReadOnly();

        if (isFetching || isDeleting || isCreating) {
            return <div><CircularProgress/></div>
        }

        return (
            <div className={styles.NewCareer}>
                <Dialog
                    open={this.state.isDeleteModalOpen}
                    onClose={this.handleCloseDelete}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Dialog"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Dialog
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleConfirmDelete} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Card className={styles['New-Career-box']}>
                    <CardHeader title={this.renderTitle()} className={styles.displayName}/>
                    <CardContent>
                        <form className={styles['New-Career-form']}>
                            <FormControl className={styles['career-form-control']} error={errors.careerName}>
                                <InputLabel required htmlFor='career-name'>Name</InputLabel>
                                <Input id='career-name'
                                       value={fields.careerName}
                                       onChange={this.handleChange('careerName')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl className={styles['career-form-control']} error={errors.careerSubjects}>
                                <InputLabel htmlFor='career-requiredSubjects'>Subjects</InputLabel>
                                {
                                    <Select
                                        value={undefined}
                                        onChange={this.handleAddTable}
                                        inputProps={{
                                            name: 'Materias',
                                            id: 'subject-requiredSubjects',
                                        }}
                                        disabled={readOnly}
                                    >
                                        {
                                            this.state.allSubjects
                                                .filter(s => s.id !== fields.id && fields.careerSubjects.indexOf(s.id) < 0)
                                                .map(s => <MenuItem value={s.id}>{s.subjectName}</MenuItem>)
                                        }
                                    </Select>
                                }
                            </FormControl>
                            <Table className={styles['table']}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={styles['tableName']}>Name</TableCell>
                                        <TableCell className={styles['tableYear']}>Year</TableCell>
                                        {
                                            !readOnly ?
                                                <TableCell>Remove</TableCell>
                                                :
                                                undefined
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        fields.careerSubjects.map((val: string, i) => {

                                            const subject = this.state.allSubjects.find(s => s.id === val);

                                            if (!subject) {
                                                return null;
                                            }

                                            return (
                                                <TableRow>
                                                    <TableCell
                                                        className={styles['tableName']}>{subject.subjectName}</TableCell>
                                                    <TableCell
                                                        className={styles['tableYear']}>{subject.careerYear}</TableCell>
                                                    {
                                                        !readOnly ?
                                                            <TableCell>
                                                                <IconButton
                                                                    onClick={() => this.handleRemoveFromTable(subject.id)}>
                                                                    <DeleteOutline/>
                                                                </IconButton>
                                                            </TableCell>
                                                            :
                                                            undefined
                                                    }
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </form>

                    </CardContent>

                    <CardActions>
                        <div className={styles.buttonContainer}>
                            {
                                readOnly
                                    ? <Button
                                        variant='contained'
                                        color='primary'
                                        className={styles['create-career-button']}
                                        onClick={this.handleEdit}
                                    >
                                        EDIT
                                    </Button>
                                    : <div className={styles.submitCancelButtons}>
                                        <Button
                                            variant='outlined'
                                            className={styles['create-career-button']}
                                            onClick={this.handleCancel}
                                        >
                                            CANCEL
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            className={styles['create-career-button']}
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

export default CareerForm;