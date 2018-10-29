import * as React from 'react';
import {HashMap, Option} from "prelude.ts";
import {
    Button,
    LinearProgress,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {DateTime, Interval} from 'luxon'
import * as RemoteData from "@devexperts/remote-data-ts";

type WebData<T> = RemoteData.RemoteData<string, T>

type Course = {
    id: string
    subjectName: string,
    interval: Interval,
    exams: string[],
}

type Exam = {
    id: string
    date: DateTime,
    description: string,
    grade: number,
}

type Model = {
    currentDate: Option<DateTime>
    examsDict: HashMap<String, Exam>,
    courses: HashMap<String, Course>,
    modalExams: WebData<Exam[]>,
    examsModalOpen: boolean,
}

const demo: Model = {
    currentDate: Option.none(),

    examsDict: HashMap.of(
        ["e1", {id: "e1", description: "Parcial 1", date: DateTime.local(2018, 3, 11), grade: 8.0}],
        ["e2", {id: "e2", description: "Parcial 2", date: DateTime.local(2018, 3, 12), grade: 4.0}],
        ["e3", {id: "e3", description: "Final", date: DateTime.local(2018, 3, 13), grade: 7.0}],
    ),

    courses: HashMap.of(
        ["c1", {
            id: 'c1',
            subjectName: "Alg 1",
            exams: ["e1", "e2", "e3"],
            interval: Interval.fromDateTimes(DateTime.utc(2017, 3, 13), DateTime.utc(2017, 5, 15)),
        }],
        ["c2", {
            id: 'c2',
            subjectName: "Alg 2",
            exams: ["e1", "e2"],
            interval: Interval.fromDateTimes(DateTime.utc(2018, 3, 13), DateTime.utc(2018, 12, 15)),
        }],
    ),

    modalExams: RemoteData.initial,
    examsModalOpen: false,
}


export class MyCourses extends React.Component<{}, Readonly<Model>> {

    readonly state: Model = demo;

    constructor(props) {
        super(props);

        this.unenroll = this.unenroll.bind(this);
        this.openExamsModal = this.openExamsModal.bind(this);
        this.closeExamsModal = this.closeExamsModal.bind(this);

    }

    componentDidMount() {
        setInterval(
            () => this.updateTime(),
            1000,
        );
    }

    updateTime() {
        this.setState(
            (prevState: Model) => ({
                ...prevState,
                currentDate: Option.some(DateTime.local()),
            }),
        )
    }


    openExamsModal(courseId: string) {
        this.setState(
            (prevState: Model): Model => ({
                ...prevState,
                examsModalOpen: true,
                modalExams: RemoteData.success(
                    this.state.courses
                        .get(courseId)
                        .flatMap(c => Option.sequence(c.exams.map(eid => this.state.examsDict.get(eid))))
                        .match({
                            Some: es => es.toArray(),
                            None: () => [],
                        }),
                ),
            }),
        )
    }

    closeExamsModal() {
        this.setState(
            (prevState: Model): Model => ({
                ...prevState,
                examsModalOpen: false,
                modalExams: RemoteData.initial,
            }),
        )
    }

    unenroll(studentId: string, courseId: string) {

    }

    // ---- VIEW ----

    render(): React.ReactNode {

        let model = this.state;

        return model.currentDate.match({
            Some: (currDate: DateTime) => {

                let coursesInProgress = model.courses
                    .filterValues(c => c.interval.contains(currDate))
                    .toArray()
                    .map(kv => kv[1]);

                let finishedCourses = model.courses
                    .filterValues(c => c.interval.isBefore(currDate))
                    .toArray()
                    .map(kv => kv[1]);


                return <div>
                    <h1>Courses in progress</h1>
                    {coursesTable(courseInProgressRow(this.openExamsModal)(this.unenroll))(coursesInProgress)}

                    <h1>Finished courses</h1>
                    {coursesTable(courseFinishedRow(this.openExamsModal))(finishedCourses)}


                    <Modal
                        open={model.examsModalOpen}
                        onClose={this.closeExamsModal}
                    >
                        <Paper style={
                            {
                                ...translateCenter,
                                position: "absolute",
                                minWidth: "50%",
                                maxWidth: "70%",
                                padding: "20px",
                            }
                        }>
                            {model.modalExams.foldL(
                                () => <LinearProgress/>,
                                () => <LinearProgress/>,
                                (err) => <p>Error!</p>,
                                (exams) => examTable(exams),
                            )}
                        </Paper>
                    </Modal>
                </div>
            },
            None: () => {
                return <LinearProgress/>

            },
        });
    }
}

const coursesTable = (rowFn: (course: Course) => React.ReactNode) => (courses: Course[]): React.ReactNode =>
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {courses.map(rowFn)}
            </TableBody>
        </Table>
    </Paper>

const courseRow = (actions: React.ReactNode) => (course: Course): React.ReactNode => {
    return (
        <TableRow key={course.id}>
            <TableCell>{course.subjectName}</TableCell>
            <TableCell>{course.interval.start.setLocale('es-AR').toLocaleString(DateTime.DATE_SHORT)}</TableCell>
            <TableCell>{course.interval.end.setLocale('es-AR').toLocaleString(DateTime.DATE_SHORT)}</TableCell>
            <TableCell>{actions}</TableCell>
        </TableRow>
    );
};

const courseInProgressRow =
    (onExamsClick: (courseId: string) => any) => (onUnenrollClick: (studentId: string, courseId: string) => any) => (course: Course) => {
        return (
            courseRow
            (
                // TODO user id
                <div>
                    <Button onClick={() => onUnenrollClick("", course.id)} variant="contained" color="primary"
                            style={{marginRight: '5px'}}>
                        Unenroll
                    </Button>
                    <Button onClick={() => onExamsClick(course.id)} variant="contained" color="primary">
                        Exams
                    </Button>
                </div>,
            )
            (course)
        )
    };

const courseFinishedRow = (onExamsClick: (courseId: string) => any) => (course: Course) => {
    return (
        courseRow
        (
            <div>
                <Button onClick={() => onExamsClick(course.id)} variant="contained" color="primary">
                    Exams
                </Button>
            </div>,
        )
        (course)
    );
};

const examTable = (exams: Exam[]) : React.ReactNode => {
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Grade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exams.map(e => {
                        return (
                            <TableRow key={e.id}>
                                <TableCell>{e.date.setLocale('es-AR').toLocaleString(DateTime.DATE_SHORT)}</TableCell>
                                <TableCell>{e.description}</TableCell>
                                <TableCell>{e.grade.toFixed(2)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
    )
}

const translateCenter = {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
}