import * as React from 'react';
import {StyleRules, Theme, withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SchoolIcon from '@material-ui/icons/School';
import BookIcon from '@material-ui/icons/Book';
import Assigment from '@material-ui/icons/Assignment';
import GolfCourse from '@material-ui/icons/GolfCourse';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import {Props, State} from "./types";
import {Link, withRouter} from "react-router-dom";
import {Domain} from "@material-ui/icons";
import {Vector, Option} from "prelude.ts";
import session from "../../../utils/session";

const drawerWidth = 240;

const styles = require('./Sidebar.pcss')

const _styles = (theme: Theme): StyleRules => ({
    // toolbar: theme.mixins.toolbar,
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

const sidebarItem = (currentRoute: string) => (d: { route: string, displayText: string, iconElement: any }) =>
    <Link key={d.route} to={d.route} className={styles.link}>
        <ListItem className={styles.listItem} selected={d.route === currentRoute}>
            <ListItemIcon>
                {d.iconElement}
            </ListItemIcon>
            <ListItemText primary={d.displayText}/>
        </ListItem>
    </Link>;

// Exhasutive check?
function sidebarLinks(s: UserType): Vector<{ route: string, displayText: string, iconElement: any }> {
    switch (s) {
        case 'Admin':
            return Vector.ofIterable([
                {route: '/admins', displayText: 'Admins', iconElement: <SupervisorAccountOutlinedIcon/>},
                {route: '/students', displayText: 'Students', iconElement: <SchoolIcon/>},
                {route: '/professors', displayText: 'Professors', iconElement: <AccountBalanceIcon/>},
                {route: '/careers', displayText: 'Careers', iconElement: <Domain/>},
                {route: '/subjects', displayText: 'Subjects', iconElement: <BookIcon/>},
                {route: '/courses', displayText: 'Courses', iconElement: <GolfCourse/>},
                {route: '/exams', displayText: 'Exams', iconElement: <Assigment/>},

            ]);
        case 'Professor':
            return Vector.ofIterable([
                {route: '/ongoing-courses', displayText: 'My ongoing courses', iconElement: <GolfCourse/>},
                {route: '/finished-courses', displayText: 'My finished courses', iconElement: <GolfCourse/>},
            ]);
        case 'Student':
            return Vector.ofIterable([
                {route: '/my-courses', displayText: 'My Courses', iconElement: <GolfCourse/>},
                {route: '/available-courses', displayText: 'Available Courses', iconElement: <GolfCourse/>},
            ]);
        default:
            let _exhaustiveCheck: never = s;
            return _exhaustiveCheck
    }
}

class Sidebar extends React.Component<Props, State> {

    state: State = {
        mobileOpen: false,
        anchorEl: null,
    };

    handleDrawerToggle = () => {
        this.setState((state: any) => ({mobileOpen: !state.mobileOpen}));
    };

    isUserLogged = () => {
        return !!sessionStorage.getItem('user');
    };

    render() {
        const {classes, theme} = this.props;

        if (!this.isUserLogged()) {
            return null;
        }

        const userKind : UserType = Option.ofNullable(session.getUserType()).getOrThrow()

        const {pathname} = this.props.location;

        // TODO switch for real
        const drawerList =
            <List>
                {sidebarLinks(userKind).map(sidebarItem(pathname))}
            </List>

        return (
            <div className={styles.container}>

                <Hidden mdUp className={styles.drawerContainer}>
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
                        {drawerList}
                    </Drawer>
                </Hidden>

                <Hidden smDown implementation='css' className={styles.drawerContainer}>
                    <Drawer
                        variant='permanent'
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        className={styles.drawer}
                    >
                        {drawerList}
                    </Drawer>
                </Hidden>

            </div>
        );
    }
}

export default withRouter(withStyles(_styles, {withTheme: true})(Sidebar));