// components/Footer.js

import React from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2', // Match the primary color
        color: '#ffffff',
        padding: '1rem 0',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">
        &copy; {currentYear} Made by Samyak Mishra with <FavoriteIcon sx={{ color: 'red', verticalAlign: 'middle' }} />. Enjoy the game!
      </Typography>
    </Box>
  );
};

export default Footer;
