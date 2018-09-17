import * as React from "react";
import {IAdmin, WebData} from "../../globals";
import AdminsTableView from "../components/AdminsTable/AdminsTableView";
import {IStore} from "../reducers";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {adminActions} from "../actions";

type StateProps = {
    admins: WebData<Array<IAdmin>>,
}

type DispatchProps = {
    getAdmins: () => void;
    deleteAdmin: (id: string) => void;
}

type RouterProps = RouteComponentProps<{ id: number }>;

type PropsType = StateProps & DispatchProps & RouterProps;


class AdminListPage extends React.Component<PropsType> {

    componentDidMount = () => {
        this.props.getAdmins();
    };

    render = () => {
        return AdminsTableView(this.props.admins)
    }
}

const mapStateToProps = (store: IStore, router: RouterProps) => ({
    admins: store.adminsState.admins,
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
    getAdmins: () => dispatch(adminActions.getAdmins()),
    deleteAdmin: (id: string) => dispatch(adminActions.deleteAdmin(id)),
});

export default withRouter(
    connect<StateProps, DispatchProps, RouterProps>
    (mapStateToProps, mapDispatchToProps)
    (AdminListPage),
);
