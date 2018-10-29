import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import {deleteExam, getAllExams, getAllExamsStudent} from "../../utils/api";
import { Link } from "react-router-dom";
import session from "../../utils/session";

// const styles = require('./ExamTable.pcss');

class ExamTable extends React.Component<IProps, IState> {

  state: IState = {
    examBeingDeleted: null,
    exams: [],
    isDeleting: false,
    examsStudent: [],
  };

  componentDidMount() {
    this.fetchExams();
  }

  fetchExams = () => {
      if(session.getUserType() === 'Student'){
          getAllExamsStudent((session.getUser() as IStudent).id).then(this.handleResponseStudentExams).then(this.receiveStudentExams);
      } else {
          getAllExams().then(this.handleResponse).then(this.receiveExams);
      }
  };

  handleResponse = (response: Response): Promise<IExam[]> => {
    if (response.status !== 200) {
      throw Error('Error fetching exams');
    }

    return response.json();
  };

  handleResponseStudentExams = (response: Response) => {
      // if (response.status !== 200) {,
      //     throw Error('Error fetching exams');
      // }
      console.log(response.status);

      return response.json();
  };

  handleDeleteClick = (id: string) => {
    const exams = this.state.exams;

    const examBeingDeleted = exams.find(exam => exam.id === id);
    if (!examBeingDeleted) {
      return;
    }

    this.setState({ examBeingDeleted });
  };

  handleCloseDelete = () => {
    this.setState({ isDeleting: false, examBeingDeleted: null });
  };

  handleConfirmDelete = () => {
    const { examBeingDeleted } = this.state;

    if (!examBeingDeleted) {
      return;
    }

    this.setState({ isDeleting: true });
    deleteExam(examBeingDeleted.id).then(() => {
      this.handleCloseDelete();
      this.fetchExams();
    });
  };

  receiveExams = (exams: IExam[]) => {
    this.setState({ exams: exams })
  };

  receiveStudentExams = (exams: IStudentExam[]) => {
      this.setState({ examsStudent: exams })
  };

  private filteredExams: any;

  render() {
    const { examBeingDeleted, isDeleting, exams, examsStudent } = this.state;

    const name = examBeingDeleted ? `${examBeingDeleted.course.subject.subjectName}` : '';

    let isStudent = session.getUserType() === 'Student';
    let text = '';
    console.log(examsStudent);

      function filter(exam: IStudentExam) {
          if(exam.course.enrolled.length > 0){
              return exam.course.enrolled.map(student =>
                  student.id == (session.getUser() as IStudent).id)
                  .reduceRight(
                      (accumulator, currentValue) => accumulator || currentValue,
                  );
          } else {
              return false;
          }
      }

    isStudent && examsStudent != undefined? this.filteredExams = examsStudent.filter(filter): false;
    isStudent? text = "Grade": text = "";

    return (
      <div>
        {
          examBeingDeleted &&
          <DeleteConfirmationDialog
            userType={'exam'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeleting}
          />
        }
          {
              !isStudent &&
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  <Link to={'/new-exam'}>
                      <Button
                          variant="fab"
                          color="primary"
                          aria-label="Add"
                          mini
                      >
                          <AddIcon />
                      </Button>
                  </Link>
              </div>
          }
        <Paper>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>{text}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {
                    isStudent?
                        this.filteredExams.map( row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.course.subject.subjectName}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{"jeje aprobaste"}</TableCell>
                                </TableRow>
                            );
                        })
                        :
                      exams.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.course.subject.subjectName}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>
                                    <Link to={`/exam/${row.id}`}>
                                        <IconButton>
                                            <Edit />
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={() => this.handleDeleteClick(row.id)}>
                                        <DeleteOutline />
                                    </IconButton>
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

export default ExamTable;
