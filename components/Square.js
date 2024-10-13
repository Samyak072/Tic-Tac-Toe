// components/Square.js

import React from 'react';
import { Button, Typography } from '@mui/material';
import { clickSound } from '../utils/sound'; // Import click sound

const Square = ({ value, onClick }) => {
  const handleClick = () => {
    if (!value) {
      clickSound.play(); // Play click sound
      onClick();
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{
        width: '100px',
        height: '100px',
        fontSize: '2rem',
        transition: 'background-color 0.3s, transform 0.2s',
        '&:hover': {
          backgroundColor: '#e0e0e0',
          transform: 'scale(1.05)',
        },
      }}
    >
      <Typography variant="h3" color="textPrimary">
        {value}
      </Typography>
    </Button>
  );
};

export default Square;
