import * as React from 'react';
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SchoolIcon from '@material-ui/icons/School';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { Props, State } from "./types";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export const enum UserType {
  PROFESSOR, ADMINISTRATOR, STUDENT,
}

const styles = require('./Sidebar.pcss')

const _styles = (theme: Theme): StyleRules => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: '100%',
    overflowY: 'hidden',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

function AdminItem() {
  return <Link to={"/admins"}>
    <ListItem>
      <ListItemIcon>
        <SupervisorAccountOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary='Administradores' />
    </ListItem>
  </Link>;
}

function ProfessorItem() {
  return <Link to={"/professors"}>
    <ListItem>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary='Profesores' />
    </ListItem>
  </Link>;
}

function StudentItem() {
  return <Link to={"/students"}>
    <ListItem>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary='Alumnos' />
    </ListItem>
  </Link>;
}

class Sidebar extends React.Component<Props, State> {

  state: State = {
    mobileOpen: false,
    anchorEl: null,
  };

  handleDrawerToggle = () => {
    this.setState((state: any) => ({ mobileOpen: !state.mobileOpen }));
  };

  isUserLogged = () => {
    return !!sessionStorage.getItem('user');
  };

  render() {
    const { classes, theme } = this.props;

    if (!this.isUserLogged()) {
      return null;
    }

    const drawerContent = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>

          <AdminItem />

          <ProfessorItem />

          <StudentItem />

        </List>
        <Divider />
      </div>
    );

    return (
      <div className={styles.container}>

        <Hidden mdUp>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>

        <Hidden smDown implementation='css'>
          <Drawer
            variant='permanent'
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>

      </div>
    );
  }
}

export default withStyles(_styles, { withTheme: true })(Sidebar);