import * as H from "history";
import { match } from "react-router";

export type Props = {
  classes?: any,
  theme?: any,
  history: H.History;
  location: H.Location<any>;
  match: match<any>;
};
export type State = {
  mobileOpen: boolean,
  anchorEl: any,
  user?: IUser,
};