import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import { getProfessorCourses } from "../../utils/api";
import session from "../../utils/session";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class OngoingCourses extends React.Component<IProps, IState> {

  state: IState = {
    courses: [],
  };

  componentDidMount() {
    this.fetchCourses();
  }

  fetchCourses = () => {
    getProfessorCourses().then(this.handleResponse).then(this.receiveCourses);
  };

  handleResponse = (response: Response) => {
    return response.json();
  };

  receiveCourses = (courses: ICourse[]) => {
    this.setState({ courses: courses })
  };

  render() {
    const { courses } = this.state;

    const userType = session.getUserType();

    if (userType === 'Student') {
      return <Redirect to={'/'} />;
    }

    return (
      <div>
        <Paper>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Start date</TableCell>
                  <TableCell>End date</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  courses.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.subject.subjectName}</TableCell>
                        <TableCell>{row.startDate}</TableCell>
                        <TableCell>{row.endDate}</TableCell>
                        <TableCell>
                          <Link to={`/course/${row.id}/exams`}><Button type={'primary'}>View exams</Button></Link>
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

export default OngoingCourses;
