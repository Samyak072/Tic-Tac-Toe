// components/Header.js

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <SportsEsportsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div">
          Tic Tac Toe
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

