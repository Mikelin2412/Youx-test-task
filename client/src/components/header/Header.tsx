import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CREATE_NEW_USER_ROUTE, HOME_ROUTE } from '../../constants/user-routes';
import classes from './style.module.css';

const Header: React.FC = () => {
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Link to={HOME_ROUTE} className={classes.link}>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            className={classes.title}
          >
            List of Users
          </Typography>
        </Link>
        <Link to={CREATE_NEW_USER_ROUTE}>
          <Button variant="contained" color="info">
            Create new user
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header
