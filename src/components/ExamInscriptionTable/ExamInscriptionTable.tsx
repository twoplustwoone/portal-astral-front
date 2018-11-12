import * as React from 'react';
import { IProps, IState } from './types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  InputLabel,
  Input,
  FormControl,
} from "@material-ui/core";
import { Cancel, Check, DeleteOutline, Edit } from "@material-ui/icons";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import {
  deleteExamInscription,
  getAllExamInscriptionsbyCourseId,
  updateExamInscription,
} from "../../utils/api";
import session from "../../utils/session";

// const styles = require('./ExamInscriptionTable.pcss');

class ExamInscriptionTable extends React.Component<IProps, IState> {

  state: IState = {
    examInscriptionBeingDeleted: null,
    examInscriptions: [],
    isDeleting: false,
    examInscriptionOnEditIndex: -1,
  };

  componentDidMount() {
    const { match } = this.props;
    this.fetchExamInscriptions(match.params.courseId);
  }

  fetchExamInscriptions = (id: string) => {
    getAllExamInscriptionsbyCourseId(id).then(this.handleResponse).then(this.receiveExamInscriptions);
  };

  handleResponse = (response: Response): Promise<IExamInscription[]> => {
    if (response.status !== 200) {
      throw Error('Error fetching examInscriptions');
    }

    return response.json();
  };

  handleDeleteClick = (id: string) => {
    const examInscriptions = this.state.examInscriptions;

    const examInscriptionBeingDeleted = examInscriptions.find(examInscription => examInscription.id === id);
    if (!examInscriptionBeingDeleted) {
      return;
    }

    this.setState({ examInscriptionBeingDeleted });
  };

  handleCloseDelete = () => {
    this.setState({ isDeleting: false, examInscriptionBeingDeleted: null });
  };

  handleConfirmDelete = () => {
    const { examInscriptionBeingDeleted } = this.state;

    if (!examInscriptionBeingDeleted) {
      return;
    }

    this.setState({ isDeleting: true });
    deleteExamInscription(examInscriptionBeingDeleted.id).then(() => {
      this.handleCloseDelete();
      this.fetchExamInscriptions(examInscriptionBeingDeleted.exam.course.id);
    });
  };

  receiveExamInscriptions = (examInscriptions: IExamInscription[]) => {
    this.setState({ examInscriptions })
  };

  handleChange = () => (event: any) => {
    const { examInscriptions, examInscriptionOnEditIndex } = this.state;
    let result = event.target.value;
    result > 10 ? result = 10 : '';
    result < 1 ? result = 1 : '';
    examInscriptions[examInscriptionOnEditIndex].result = result;
    this.setState({ examInscriptions: examInscriptions });
  };

  handleSubmit = () => {
    updateExamInscription(this.state.examInscriptions[this.state.examInscriptionOnEditIndex]);
    this.setState({ examInscriptionOnEditIndex: -1 });
  };

  handleExamInscriptionEdit = (index) => {
    this.setState({ examInscriptionOnEditIndex: index })
  };

  render() {
    const { examInscriptionBeingDeleted, isDeleting, examInscriptions, examInscriptionOnEditIndex } = this.state;

    const name = examInscriptionBeingDeleted ? `${examInscriptionBeingDeleted.id + ' exam'}` : '';

    const examInscription = examInscriptions.length > 0 ? examInscriptions[0] : undefined;
    let course;
    if (examInscription)
      course = examInscription.exam.course;

    const isStudent = session.getUserType() === 'Student';

    return (
      <div>
        {
          examInscriptionBeingDeleted &&
          <DeleteConfirmationDialog
            userType={'examInscription'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeleting}
          />
        }
        <Paper>
          <div>
            {course &&
            <div style={{ padding: '15px', marginTop: '15px', fontFamily: 'sans-serif' }}>
              <h2>{course.subject.subjectName} exams</h2>
              <h3 style={{ fontWeight: 300 }}>{course.startDate} - {course.endDate}</h3>
            </div>
            }
            <Table>
              <TableHead>
                <TableRow>
                  {!isStudent && <TableCell>Student</TableCell>}
                  <TableCell>Date</TableCell>
                  <TableCell>Mark</TableCell>
                  {!isStudent && <TableCell />}
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  examInscriptions.map((row, index) => {
                    return (
                      <TableRow key={row.id}>
                        {!isStudent && <TableCell>{row.student.name + row.student.lastName}</TableCell>}
                        <TableCell>{row.exam.date}</TableCell>
                        <TableCell>
                          {examInscriptionOnEditIndex !== index &&
                          <span>{row.result}</span>
                          }
                          {examInscriptionOnEditIndex === index &&
                          <FormControl>
                            <InputLabel required htmlFor='exam-result'>Result</InputLabel>
                            <Input id='exam-result'
                                   inputProps={{ min: "0", max: "10" }}
                                   value={row.result}
                                   onChange={this.handleChange()}
                                   type={'number'}
                            />
                          </FormControl>
                          }
                        </TableCell>
                        {!isStudent && <TableCell>
                          {examInscriptionOnEditIndex !== index &&
                          <IconButton onClick={() => this.handleExamInscriptionEdit(index)}>
                            <Edit />
                          </IconButton>
                          }
                          {examInscriptionOnEditIndex === index &&
                          <span>
                                    <IconButton onClick={() => this.handleExamInscriptionEdit(-1)}>
                                        <Cancel />
                                    </IconButton>
                                    <IconButton onClick={() => this.handleSubmit()}>
                                        <Check />
                                    </IconButton>
                                </span>
                          }
                          <IconButton onClick={() => this.handleDeleteClick(row.id)}>
                            <DeleteOutline />
                          </IconButton>
                        </TableCell>}
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

export default ExamInscriptionTable;
