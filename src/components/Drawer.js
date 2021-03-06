import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';
import logo from '../assets/appbar-logo.svg';
import { UserContext } from '../UserContext';
import Cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },

  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const LoginState = () => {
  const username = useContext(UserContext);
  const history = useHistory();

  if (username != null) {
    return (
      <a>
        <Button size="large" color="inherit" disableRipple="true">
          {username}
        </Button>

        <Button
          color="inherit"
          onClick={() => {
            Cookie.remove('token');
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </a>
    );
  } else {
    return (
      <div>
        <Button
          color="inherit"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            history.push('/sign-up');
          }}
        >
          Sign Up
        </Button>
      </div>
    );
  }
};

export default function TemporaryDrawer() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const history = useHistory();

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
      <List>
        <ListItem
          button
          key="Student Tools"
          onClick={() => {
            history.push('/');
          }}
        >
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Tools" />
        </ListItem>
        <ListItem
          nav
          button
          key="Grade Calculator"
          onClick={() => {
            history.push('/');
          }}
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Grade Calculator" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
        <AppBar position="static" style={{ background: '#34ccfc' }}>
          <Toolbar>
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              disableRipple="false"
              size="medium"
            >
              <MenuIcon onClick={toggleDrawer('left', true)} />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <img src={logo} alt="student tools" />
            </Typography>
            <LoginState />
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
