import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import {Edit} from "@material-ui/icons";

const drawerWidth = 240;

export const enum UserType {
    PROFESSOR, ADMINISTRATOR, STUDENT,
}

const styles = (theme: any) => ({
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

class Sidebar  extends React.Component<any, any> {
    state = {
        mobileOpen: false,
        anchorEl: null,
    };

    handleDrawerToggle = () => {
        this.setState((state: any) => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme, history, userType}: any = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {userType === UserType.ADMINISTRATOR ? <ListItem button onClick={() => history.push('/admins')}>
                        <ListItemIcon>
                            <SupervisorAccountOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Administradores' />
                    </ListItem> : undefined}
                    {userType === UserType.ADMINISTRATOR || userType === UserType.PROFESSOR ? <ListItem button onClick={() => history.push('/professors')}>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary='Profesores' />
                    </ListItem> : undefined}
                    <ListItem button onClick={() => history.push('/students')}>
                        <ListItemIcon>
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary='Alumnos'/>
                    </ListItem>
                    <ListItem button onClick={() => history.push('/subjects')}>
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                        <ListItemText primary='Subjects'/>
                    </ListItem>
                </List>
                <Divider />
            </div>
        );

        return (
            <div>
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
                        {drawer}
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
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

export default withStyles(styles as any, { withTheme: true })(Sidebar);