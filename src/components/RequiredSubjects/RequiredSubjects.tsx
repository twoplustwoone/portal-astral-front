import * as React from 'react';
import {IProps, IState} from "./types";
import {ISubject} from "../../../globals";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
// import AddIcon from '@material-ui/icons/Add';
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import RequiredSubjectTest from "./RequiredSubjectTest";


const styles = require('./RequiredSubjects.pcss');

class RequiredSubjects extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            id: '4',
            name: 'AM 4',
            careerYear: 2,
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


    subjectsTest: RequiredSubjectTest[] = [
        new RequiredSubjectTest(1, "1", "AM 1", []),
        new RequiredSubjectTest(1, "2", "AM 2", []),
        new RequiredSubjectTest(2, "3", "AM 3", []),
    ];

//METHODS

    componentDidMount() {
        // this.state.all = onFetchSubjects;
        this.setArraySubjectsToMap(this.subjectsTest, this.state.subjects.all);
    }

    updatetAllSubjects = (requiredSubjects: Map<string, ISubject>): Map<string, ISubject> => {

        let result: Map<string, ISubject> = new Map<string, ISubject>();

        this.state.subjects.all.forEach(subject => {
            if (!requiredSubjects.has(subject.id)) {
                result.set(subject.id, subject)
            }
        });
        return result
    };

    setArraySubjectsToMap = (from: ISubject[], to: Map<string, ISubject>) => {
        from.forEach(r => {
            to.set(r.id, r);
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

    handleSelectChange = (prop: string) => (event: any) => {
        this.setState({
            ...this.state,
            subjects: {
                ...this.state.subjects,
                [prop]: event.target.value,
            },
        });
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
        this.setArraySubjectsToMap(this.subjectsTest, this.state.subjects.all);

        return (
            <div className={styles.RequiredSubject}>
                <Grid item xs={3}/>
                <Grid item xs={6}>
                    <Card className={styles['CardSubjects']}>
                        <CardContent>
                            <div className={styles.SelectButtonSubjects}>
                                <Select
                                    className={styles.selectSubjects}
                                    multiple
                                    value={subjects.selected}
                                    // onChange={this.handleChange()}
                                    onChange={this.handleSelectChange('selected')}
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
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    className={styles.addButton}
                                    onClick={this.handleAddRequiredSubject(subjects.selected, subjects.all, subjects.required)}
                                >
                                    ADD
                                </Button>
                            </div>
                            <div className={styles.Chips}>
                                {
                                    this.renderRequiredChips(subjects.required, subjects.all)
                                }
                            </div>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3}/>
            </div>

        );
    }
}

export default RequiredSubjects;