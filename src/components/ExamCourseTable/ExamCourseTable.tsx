import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import {
  enrollStudentInExam,
  getAllExamInscriptionsbyCourseId,
  getAllExams,
  getCourseById,
  unenrollStudentInExam,
} from "../../utils/api";
import Typography from "@material-ui/core/es/Typography/Typography";
import session from "../../utils/session";
import Button from "@material-ui/core/es/Button/Button";

// const styles = require('./ExamTable.pcss');

class ExamCourseTable extends React.Component<IProps, IState> {

  state: IState = {
    course: {
      "id": "",
      "startDate": "",
      "endDate": "",
      "subject": {
        "id": "",
        "subjectName": "",
        "careerYear": 0,
        "requiredSubjects": [],
        "students": [],
      },
      courseProfessors: [],
    },
    examIns: [],
    exams: [],
  };

  componentDidMount() {
    this.fetchInfo()
  }

  fetchInfo = () => {
    const { match } = this.props;
    getCourseById(match.params.courseId).then(this.handleCourse).then(this.setCourse);
    getAllExamInscriptionsbyCourseId(match.params.courseId).then(this.handleExamIns).then(this.setExamIns);
    getAllExams().then(this.handleExams).then(this.setExams);
  };

  handleExams = (response: Response): Promise<IExam[]> => {
    if (response.status === 404) {
    }

    return response.json();
  };

  handleCourse = (response: Response): Promise<ICourse> => {
    if (response.status === 404) {
    }

    return response.json();
  };

  handleExamIns = (response: Response): Promise<IExamInscription[]> => {
    if (response.status === 404) {
    }

    return response.json();
  };

  setExams = (exams: IExam[]) => {
    this.setState({ exams: exams });
  };

  setCourse = (course: ICourse) => {
    this.setState({ course: course });
  };

  setExamIns = (examIns: IExamInscription[]) => {
    this.setState({ examIns: examIns });
  };

  handleEnrollment = (examId: string, studentId: string) => {
    // this.filteredExams = this.filteredExams.filter(exam => exam.id != examId);
    enrollStudentInExam(examId, studentId).then(this.fetchInfo);
    // this.addExamIns(examId);
  };

  // addExamIns = (examId: string) => {
  //   const examIns = getAllExamInscriptionsbyExamId(examId);
  //   this.filteredExamIns.push(examIns);
  // };

  handleUnenrollment = (examId: string) => {
    unenrollStudentInExam(examId, (session.getUser() as IStudent).id).then(this.fetchInfo)
  };

  private filteredExamIns: any;
  private filteredExams: any;

  render() {
    const { examIns, exams, course } = this.state;

    this.filteredExamIns = examIns.filter(examFilter);
    var examsToFilter = this.filteredExamIns.map(ins => ins.exam);

    this.filteredExams = exams.filter(exam => exam.course.id == course.id &&
      examsToFilter.filter(x => x.id == exam.id).length <= 0);

    function examFilter(examIns: IExamInscription) {
      return examIns.student.id == (session.getUser() as IStudent).id
    }

    return (
      <div>
        <Typography color='textPrimary' variant="title">
          {
            course.subject.subjectName + " exams"
          }
        </Typography>
        <Typography>
          {
            course.startDate + " — "
          }
          {
            course.endDate
          }
        </Typography>
        <Paper>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.filteredExams.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary"
                                  onClick={() => this.handleEnrollment(row.id, (session.getUser() as IStudent).id)}>
                            REGISTER
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
                {
                  this.filteredExamIns.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.exam.date}</TableCell>
                        <TableCell>{row.result}</TableCell>
                        <TableCell>
                          {
                            row.result == 0 ?
                              <Button variant="outlined" color="primary"
                                      onClick={() => this.handleUnenrollment(row.exam.id)}>
                                UNREGISTER
                              </Button>
                              :
                              <Button variant="outlined" color="primary" disabled={true}>
                                TAKEN
                              </Button>
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })
                }

              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

export default ExamCourseTable;
