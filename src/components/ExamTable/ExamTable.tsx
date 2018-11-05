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
          getAllExamsStudent((session.getUser() as IStudent).id)
              .then(this.handleResponseStudentExams)
              .then(this.receiveStudentExams);
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

  render() {
    const { examBeingDeleted, isDeleting, exams, examsStudent } = this.state;

    const name = examBeingDeleted ? `${examBeingDeleted.course.subject.subjectName}` : '';

    let isStudent = session.getUserType() === 'Student';
    let text = '';

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
                    isStudent && examsStudent !== undefined ?
                        examsStudent.map( row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.exam.course.subject.subjectName}</TableCell>
                                    <TableCell>{row.exam.date}</TableCell>
                                    <TableCell>{row.result}</TableCell>
                                </TableRow>
                            );
                        })
                        :
                      exams.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.course.subject.subjectName}</TableCell>
                                {/*<TableCell>{row.course && row.course.subject && row.course.subject.subjectName}</TableCell>*/}
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
