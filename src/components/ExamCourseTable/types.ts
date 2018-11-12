import {match} from "react-router";
import * as H from "history";

export interface IProps {
    history: H.History;
    location: H.Location<any>;
    match: match<any>;
}

export interface IState {
  course: ICourse;
  exams: IExam[];
  examIns: IExamInscription[];
  redirect?: string;
}