import {match} from "react-router";

export interface IProps {
    match: match<any>;
}

export interface IState {
  examInscriptionBeingDeleted: IExamInscription | null;
  examInscriptions: IExamInscription[];
  isDeleting: boolean;
  examInscriptionOnEdit: string;
}