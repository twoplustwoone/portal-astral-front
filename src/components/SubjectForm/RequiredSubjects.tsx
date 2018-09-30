import * as React from 'react';
import {IProps, IState} from "./types";
import {ISubject} from "../../../globals";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";
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
            all: new Map<string, ISubject>(),
            selected: [],
            required: new Map<string, ISubject>(),
        },
        // Missing errors
        // error: {},
        isNew: false,
        isEditing: false,
    };


//METHODS

    componentDidMount() {
        // this.state.all = onFetchSubjects;
    }


    UpdatetAllSubjects = (requiredSubjects: Map<string, ISubject>): Map<string, ISubject> => {

        let result: Map<string, ISubject> = new Map<string, ISubject>();

        this.state.subjects.all.forEach(subject => {
            if (!requiredSubjects.has(subject.id)) {
                result.set(subject.id, subject)
            }
        });
        return result
    };

    setArraySubjectsToMap = (subjects: ISubject[]) => {
        let requiredMap: Map<string, ISubject> = new Map<string, ISubject>();
        subjects.forEach(r => {
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

    handleAddRequiredSubject = (subjectIds: string[], allSubjects: Map<string, ISubject>, requiredSubjects: Map<string, ISubject>) => (event: any) => {
        subjectIds.forEach(() => {
            let sId = subjectIds.pop();
            if (sId == undefined) return;
            let subject = allSubjects.get(sId);
            if (subject == undefined) return;
            requiredSubjects.set(sId, subject);
            allSubjects.delete(sId);
        });
    };

    handleRemoveRequiredSubject = (subjectId: string, allSubjects: Map<string, ISubject>, requiredSubjects: Map<string, ISubject>) => (event: any) => {
        let subject = requiredSubjects.get(subjectId);
        if (subject == undefined) return;
        allSubjects.set(subjectId, subject);
        requiredSubjects.delete(subjectId);

    };

    renderRequiredChips = (required_subjects: Map<string, ISubject>, all_subjects: Map<string, ISubject>) => {
        return (
            Array.from(required_subjects.values()).map(subject => {
                return (
                    <Chip
                        key={subject.id}
                        label={subject.name}
                        onDelete={this.handleRemoveRequiredSubject(subject.id, all_subjects, required_subjects)}
                        className={styles.chip}
                    />
                );
            })
        );
    };

    render() {
        const {subjects} = this.state;
        return (
            <div className={styles.RequiredSubject}>
                <Card className={styles['Card']}>
                    <CardContent>
                        <FormControl className={styles.FormControl}>
                            <div>
                                <Select
                                    multiple
                                    value={subjects.selected}
                                    // onChange={this.handleChange()}
                                    onChange={this.handleSelectChange('all-subjects')}
                                    input={<Input id="select-multiple"/>}
                                    // MenuProps={MenuProps}
                                >
                                    {Array.from(subjects.all.values()).map(subject => (
                                        <MenuItem
                                            key={subject.id}
                                            value={subject.id}
                                        >
                                            {subject.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button
                                    className={styles["addButton"]}
                                    variant="fab"
                                    color="primary"
                                    aria-label="Add"
                                    onClick={this.handleAddRequiredSubject(subjects.selected, subjects.all, subjects.required)}
                                >
                                    <AddIcon/>
                                </Button>
                            </div>
                        </FormControl>
                        <div className={styles.Chips}>
                            {
                                this.renderRequiredChips(subjects.required, subjects.all)
                                // Array.from(subjects.required.values()).map(subject => {
                                //     return (
                                //         <Chip
                                //             key={subject.id}
                                //             label={subject.name}
                                //             onDelete={this.handleRemoveRequiredSubject(subject.id, subjects.all,subjects.required)}
                                //             className={styles.chip}
                                //         />
                                //     );
                                // })
                            }
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