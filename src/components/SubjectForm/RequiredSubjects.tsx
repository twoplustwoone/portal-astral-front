import * as React from 'react';
import {IProps, IState} from "./types";
import {ISubject} from "../../../globals";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Chip from "@material-ui/core/Chip";


const styles = require('./SubjectForm.pcss');

class RequiredSubjects extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            id: '',
            name: '',
            careerYear: 0,
            required_subjects: [],
        },
        subjects: {
            all_subjects: new Map<string, ISubject>(),
            required_subjects: new Map<string, ISubject>(),
        },
        // Missing errors
        // error: {},
        isNew: false,
        isEditing: false,
    };


//METHODS

    componentDidMount() {
        // this.state.all_subjects = onFetchSubjects;
    }


    UpdatetAllSubjects = (requiredSubjects: Map<string, ISubject>): Map<string, ISubject> => {

        let result: Map<string, ISubject> = new Map<string, ISubject>();

        this.state.subjects.all_subjects.forEach(subject => {
            if (!requiredSubjects.has(subject.id)) {
                result.set(subject.id, subject)
            }
        });
        return result
    };

    setRequiredSubjectsToMap = () => {
        let requiredMap: Map<string, ISubject> = new Map<string, ISubject>();
        this.state.fields.required_subjects.forEach(r => {
            requiredMap.set(r.id, r);
        });
        return requiredMap;
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

    handleSelectChange = (prop: string) => (event: any) => {
        this.setState({
            ...this.state,
            [prop]: event.target.value,
        })
    };

    handleAddRequiredSubject = (subjectId: string, allSubjects: Map<string, ISubject>, requiredSubjects: Map<string, ISubject>) => (event: any) => {
        let subject = allSubjects.get(subjectId);
        if (subject == undefined) return;
        requiredSubjects.set(subjectId, subject);
        allSubjects.delete(subjectId);
    };

    handleRemoveRequiredSubject = (subjectId: string, allSubjects: Map<string, ISubject>, requiredSubjects: Map<string, ISubject>) => (event: any) => {
        let subject = requiredSubjects.get(subjectId);
        if (subject == undefined) return;
        allSubjects.set(subjectId, subject);
        requiredSubjects.delete(subjectId);

    };

    renderRequiredChips = (required_subjects: Map<string, ISubject>, all_subjects: Map<string, ISubject>) => {
        return <div>
            {
                Array.from(required_subjects.values()).map(subject => {
                        return (<Chip
                            key={subject.id}
                            label={subject.name}
                            onDelete={this.handleRemoveRequiredSubject(subject.id, all_subjects, required_subjects)}
                            className={styles.chip}
                        />);
                    }
                )
            }
        </div>

    };

    render() {
        const {subjects} = this.state;
        return (
            <div className={styles.RequiredSubject}>
                <Card className={styles['Card']}>
                    <CardContent>
                        <FormControl className={styles.FormControl}>
                            <div>
                                <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                                <Select
                                    multiple
                                    value={Array.from(subjects.all_subjects.keys())}
                                    // onChange={this.handleChange()}
                                    onChange={this.handleSelectChange('all-subjects')}
                                    input={<Input id="select-multiple"/>}
                                    // MenuProps={MenuProps}
                                >
                                    {Array.from(subjects.all_subjects.values()).map(subject => (
                                        <MenuItem
                                            key={subject.id}
                                            value={subject.id}
                                        >
                                            {subject.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button variant="fab" color="primary" aria-label="Add"
                                        className={styles["AddButton-subject-required"]}>
                                    <AddIcon/>
                                </Button>
                            </div>
                        </FormControl>
                        <div>
                            {this.renderRequiredChips(subjects.required_subjects, subjects.all_subjects)}
                        </div>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>
            </div>

        );
    }
}

export default RequiredSubjects;