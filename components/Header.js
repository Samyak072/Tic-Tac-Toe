// components/Header.js

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { muteAll, unmuteAll } from '../utils/sound'; // Import mute functions

const Header = () => {
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    if (isMuted) {
      unmuteAll();
    } else {
      muteAll();
    }
    setIsMuted(!isMuted);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <SportsEsportsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tic Tac Toe
        </Typography>
        <IconButton color="inherit" onClick={handleMuteToggle}>
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
