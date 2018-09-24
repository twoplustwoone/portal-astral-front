import { connect } from 'react-redux';
import {
  ITopbarDispatchProps,
  ITopbarValueProps,
  ITopbarContainerProps,
} from '../../components'
// import { TopbarActions, uiActions } from "../../actions"; esto sirve para conectar con el back
import { withRouter } from "react-router";
import { uiActions } from "../../actions";
import { IStore } from "../../reducers";
import { default as Topbar } from "../../components/layout/topbar/Topbar";

const mapStateToProps = (state: IStore, ownProps: ITopbarContainerProps): ITopbarValueProps => {
  return {
    isLogOutOpen: state.ui.is.open.logOutModal,
    // user: state.authReducer.user,
      user: {
          name: "Flor",
          lastName: "Vimberg",
          email: "flor@gmai.com",
          id: "123asdqweasd3123",
          file:"sapo",
          password: "perrito23",
      },
  };
};

const mapDispatchToProps = (dispatch: (action: any) => any | void, props?: ITopbarContainerProps): ITopbarDispatchProps => ({

  onClickLogOut() {
      console.log("topbar.ts");
    dispatch(uiActions.openLogOutModal());
  },

  onCloseLogOut() {
    dispatch(uiActions.closeLogOutModal())
  },

  onConfirmLogOut() {

  },

  // onCancel() {
  //     props.history.push('/');
  // },
});

export default withRouter((connect(mapStateToProps, mapDispatchToProps))(Topbar));