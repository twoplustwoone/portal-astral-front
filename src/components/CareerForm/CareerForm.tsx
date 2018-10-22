import * as React from 'react'
import {IProps, IState} from './types';
import CareerServices from "./CareerServices";
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

const styles = require('./CareerForm.pcss');

class CareerForm extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            id: '',
            name: '',
            subjects: [],
        },
        errors: {
            name: false,
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
            CareerServices.prototype.getCareerByID(match.params.id)
                .then(this.handleResponse)
                .then(this.setCareer)
                .catch(this.redirect);
            this.setState({isNew: false, isFetching: true});
        } else {
            this.setState({isNew: true});
        }
    }

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

        const {id, name, subjects} = career;
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                id,
                name,
                subjects,
            },
        });
    };

    redirect = () => {
        this.setState({
            redirect: '/career',
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

        CareerServices.prototype.deleteCareer(career.id)
            .then(() => {
                this.setState({redirect: '/career'})
            });
    };

    handleDeleteClick = () => {
        // this.props.onClickDelete(this.props.career as ICareer);
        this.setState({isDeleteModalOpen: true});
    };

    handleSubmit = () => {
        if (!this.state.isNew) {
            CareerServices.prototype.updateCareer(this.state.fields)
                .then(() => this.setState({redirect: '/careers'}));
        }
        else {
            CareerServices.prototype.createCareer(this.state.fields)
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
        // TODO check this
        const {subjects} = this.state.fields;
        subjects.push(event.target.value);
        this.setState({...this.state, fields: {...this.state.fields, subjects}});
    };

    handleRemoveFromTable = (id: string) => {
        const {subjects} = this.state.fields;
        const subjectsRemove = subjects.filter((sub) => sub === id);
        this.setState({...this.state, fields: {...this.state.fields, subjectsRemove}});
    };

    areInputsReadOnly = () => {
        const {isEditing} = this.state;
        return !isEditing;
    };

    renderTitle = () => {
        const {isNew} = this.state;
        const {name} = this.state.fields;
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
            <div className={styles.displayNameDiv}>{`${name}`}</div>
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
                    <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
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
                            <FormControl className={styles['career-form-control']} error={errors.name}>
                                <InputLabel required htmlFor='career-name'>First name</InputLabel>
                                <Input id='career-name'
                                       value={fields.name}
                                       onChange={this.handleChange('name')}
                                       readOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl className={styles['subject-form-control']} error={errors.subjects}>
                                <InputLabel required htmlFor='subject-requiredSubjects'>Correlativas</InputLabel>
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
                                                .filter(s => s.id !== fields.id && fields.subjects.indexOf(s.id) < 0)
                                                .map(s => <MenuItem value={s.id}>{s.subjectName}</MenuItem>)
                                        }
                                    </Select>
                                }
                                <Table className={styles.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Year</TableCell>
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
                                            fields.subjects.map((val: string, i) => {

                                                const subject = this.state.allSubjects.find(s => s.id === val);

                                                if (!subject) {
                                                    return null;
                                                }

                                                return <div>
                                                    <TableRow>
                                                        <TableCell>{subject.subjectName}</TableCell>
                                                        <TableCell>{subject.careerYear}</TableCell>
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
                                                </div>
                                            })
                                        }
                                    </TableBody>
                                </Table>
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