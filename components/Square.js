// components/Square.js

import React from 'react';
import { Button, Typography } from '@mui/material';

const Square = ({ value, onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
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

