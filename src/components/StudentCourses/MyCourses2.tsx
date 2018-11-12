import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import { getStudentCourses } from "../../utils/api";
import { Link } from "react-router-dom";

export type IProps = {}

export type IState = {
  courses: ICourse[],
}

class MyCourses2 extends React.Component<IProps, IState> {

  state: IState = {
    courses: [],
  };

  componentDidMount() {
    this.fetchCourses();
  }

  fetchCourses = () => {
    getStudentCourses().then(this.handleResponse).then(this.receiveCourses);
  };

  handleResponse = (response: Response) => {
    return response.json();
  };

  receiveCourses = (courses: ICourse[]) => {
    this.setState({ courses: courses })
  };

  render() {
    const { courses } = this.state;

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
                          <Button variant="contained" color="primary">
                            <Link to={`/view-exam/${row.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                              View exams
                            </Link>
                          </Button>
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

export default MyCourses2;
