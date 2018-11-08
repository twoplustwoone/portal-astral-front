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
import {Cancel, Check, DeleteOutline, Edit} from "@material-ui/icons";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import {
    deleteExamInscription,
    getAllExamInscriptionsbyCourseId,
    updateExamInscription,
} from "../../utils/api";

// const styles = require('./ExamInscriptionTable.pcss');

class ExamInscriptionTable extends React.Component<IProps, IState> {

  state: IState = {
    examInscriptionBeingDeleted: null,
    examInscriptions: [],
    isDeleting: false,
      examInscriptionOnEdit: '',
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

    // handleChange = (index) => (event: any) => {
    //     this.setState({
    //         examInscriptions: update(this.state.examInscriptions, {index: {result: {$set: event.target.value}}})
    //     });
    //     // let newExamInscriptions = Object.assign({}, this.state.examInscriptions);
    //     // newExamInscriptions[index].result = event.target.value;
    //     // this.setState({
    //     //     examInscriptions: newExamInscriptions,
    //     //     examInscriptionOnEdit: '',
    //     // });
    // };

    handleChange = (index) => (event: any) => {
        const newExamInscriptions = this.state.examInscriptions;
        newExamInscriptions[index].result = event.target.value;
        this.forceUpdate();
    };

    handleSubmit = (index) => {
        updateExamInscription(this.state.examInscriptions[index]).then(() => console.log("Modified!", this.state));
    };

    handleExamInscriptionEdit = (id) => {
        this.setState({examInscriptionOnEdit: id})
    };

  render() {
    const { examInscriptionBeingDeleted, isDeleting, examInscriptions, examInscriptionOnEdit } = this.state;

    const name = examInscriptionBeingDeleted ? `${examInscriptionBeingDeleted.id + ' exam'}` : '';

    const examInscription = examInscriptions.pop();
    let course;
    if (examInscription)
        course = examInscription.exam.course;

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
                  <div style={{padding: '15px', marginTop: '15px', fontFamily: 'sans-serif'}}>
                      <h2>{course.subject.subjectName} exams</h2>
                      <h3 style={{fontWeight: 300}}>{course.startDate} - {course.endDate}</h3>
                  </div>
              }
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Mark</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  examInscriptions.map((row, index) => {
                    return (
                      <TableRow key={row.id}>
                          <TableCell>{row.student.name + row.student.lastName}</TableCell>
                          <TableCell>{row.exam.date}</TableCell>
                          <TableCell>
                            {examInscriptionOnEdit === '' &&
                                <span>{row.result}</span>
                            }
                            {examInscriptionOnEdit ===  row.id &&
                                <FormControl>
                                    <InputLabel required htmlFor='exam-result'>Result</InputLabel>
                                    <Input id='exam-result'
                                           value={row.result}
                                           onChange={this.handleChange(index)}
                                           type={'number'}
                                    />
                                </FormControl>
                            }
                          </TableCell>
                          <TableCell>
                            {examInscriptionOnEdit === '' &&
                                <IconButton onClick={() => this.handleExamInscriptionEdit(row.id)}>
                                  <Edit />
                                </IconButton>
                            }
                            {examInscriptionOnEdit === row.id &&
                                <span>
                                    <IconButton onClick={() => this.handleExamInscriptionEdit('')}>
                                        <Cancel />
                                    </IconButton>
                                    <IconButton onClick={() => this.handleSubmit(index)}>
                                        <Check />
                                    </IconButton>
                                </span>
                            }
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

export default ExamInscriptionTable;
