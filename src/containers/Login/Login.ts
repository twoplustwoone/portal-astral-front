import {
    Login,
    ILoginValueProps,
    ILoginDispatchProps,
} from "../../components";
import loginAction from "../../actions/loginAction";
import {IStore} from "../../reducers";
import {IUser} from "../../../globals";
import {withRouter} from "react-router";
import {connect} from "react-redux";


const mapStateToProps = (state: IStore): ILoginValueProps => {
    const loggedUser: IUser | undefined = state.authGuard.user;

    return {
        loggedUser,
    };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void): ILoginDispatchProps => ({

    logIn: function (email: string, password: string) {
        return dispatch(loginAction.logIn(email, password));
    },
});

export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(Login)) as typeof Login;