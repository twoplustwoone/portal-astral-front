import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  Button,
  Dialog, DialogActions,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import session from "../../../utils/session";
import { AccountCircle } from "@material-ui/icons";
import { logout } from "../../../utils/api";


const drawerWidth = 240;

const styles = require('./Topbar.pcss');

const _styles = (theme: any) => ({
  appBar: {
    position: 'absolute',
    backgroundColor: '#2196f3',
    marginLeft: drawerWidth,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  accountBtn: {
    marginLeft: 'auto',
  },
});

type ProfileButtonProps = {
  classes: any,
  handleMenu: (event: any) => void,
  anchorEl: any,
  handleClose: () => void,
  handleLogOut: () => void,
};

function ProfileButton(props: ProfileButtonProps) {
  const user = session.getUser() as IUser;
  const { name, lastName } = user;

  const isOpen = Boolean(props.anchorEl);

  return <div className={styles.profileButton}>

    <div className={styles.wrapper}>
      <Typography variant='title' color='inherit' noWrap>
        {`${name} ${lastName}`}
      </Typography>

      <IconButton
        aria-owns={isOpen ? "menu-appbar" : undefined}
        className={props.classes.accountBtn}
        aria-haspopup="true"
        onClick={props.handleMenu}
        color="inherit"
      >
        <AccountCircle />

      </IconButton>
    </div>
    <Menu
      id="menu-appbar"
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen}
      onClose={props.handleClose}
    >
      <MenuItem onClick={props.handleClose}>Profile</MenuItem>
      <MenuItem onClick={props.handleLogOut}>Log out</MenuItem>

    </Menu>
  </div>;
}

class Topbar extends React.Component<any, any> {
  state = {
    mobileOpen: false,
    anchorEl: null,
    isLogOutDialogOpen: false,
    redirect: '',
  };

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickLogOut = () => {
    this.setState({ isLogOutDialogOpen: true });
  };

  handleCloseLogOut = () => {
    this.setState({ isLogOutDialogOpen: false });
  };

  handleLogOut = () => {
    logout().then(this.redirect)
  };

  redirect = () => {
    session.logout();
    window.location.reload(true);
  };

  render() {
    const { classes }: any = this.props;
    const { anchorEl, isLogOutDialogOpen } = this.state;

    const isLogged = session.isLogged();
    return (
      <div className={styles.container}>
        <Dialog open={isLogOutDialogOpen} onClose={this.handleCloseLogOut}>
          <DialogTitle>{'Esta seguro que desea cerrar sesion?'}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseLogOut} color="primary">
              No
            </Button>
            <Button onClick={this.handleLogOut} color="primary" autoFocus>
              Sí
            </Button>
          </DialogActions>
        </Dialog>
        <AppBar position="static">
          <Toolbar className={styles.toolbar}>

            <div className={styles.left}>
              <Typography variant="title" color="inherit" className={classes.grow}>
                Portal Astral
              </Typography>
            </div>

            {
              !isLogged
                ? <Button color="inherit">Login</Button>
                : <ProfileButton
                  classes={classes}
                  handleMenu={this.handleMenu}
                  anchorEl={anchorEl}
                  handleClose={this.handleClose}
                  handleLogOut={this.handleClickLogOut}
                />
            }

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(_styles as any, { withTheme: true })(Topbar);
