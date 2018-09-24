// import {
//     ILoginFormDispatchProps,
//     ILoginContainerProps,
//     ILoginDispatchProps,
// } from "../../components";
// import loginAction from "../../actions/loginAction";
// import {withRouter} from "react-router";
// import {connect} from "react-redux";
// import {objectToArray} from "../../helpers/objectToArray";
// import {IStore} from "../../reducers";
// import {IUser} from "../../../globals";
//
//
// const mapStateToProps = (state: IStore, ownProps: ILoginContainerProps): ILoginValueProps => {
//     const Logins: IUser[] = objectToArray(state.IUser);
//
//     return {
//         Logins,
//         isDeleteConfirmationOpen: state.ui.is.open.deleteConfirmationModal,
//         isLoading: state.ui.is.loading.Login,
//         isDeletingLogin: state.ui.is.deleting.Login,
//     };
// };
//
// const mapDispatchToProps = (dispatch: (action: any) => any | void, props: ILoginContainerProps): ILoginDispatchProps => ({
//
//     onFetchUser(email:string, password:string){
//         return dispatch(loginAction.fetchRequest(email,password));
//     }
// });
//
// export default withRouter((connect(mapStateToProps, mapDispatchToProps) as any)(Login)) as typeof Login;