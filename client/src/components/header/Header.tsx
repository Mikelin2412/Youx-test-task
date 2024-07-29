import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          List of Users
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header
