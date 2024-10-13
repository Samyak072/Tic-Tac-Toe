// pages/index.js

import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import Header from '../components/Header';
import Board from '../components/Board';
import Scoreboard from '../components/Scoreboard';
import Footer from '../components/Footer'; // Import Footer component
import { calculateWinner } from '../utils/gameLogic';
import {
  winSound,
  drawSound,
  resetSound,
  playBackgroundMusic,
  pauseBackgroundMusic,
} from '../utils/sound'; // Import sounds

const Home = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('single'); // 'single' or 'multi'

  useEffect(() => {
    // Play background music on mount
    playBackgroundMusic();
    return () => {
      // Pause background music on unmount
      pauseBackgroundMusic();
    };
  }, []);

  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
      setScores((prevScores) => ({ ...prevScores, [win]: prevScores[win] + 1 }));
      winSound.play(); // Play win sound
      setTimeout(resetBoard, 2000);
    } else if (!board.includes(null)) {
      setWinner('Draw');
      setScores((prevScores) => ({ ...prevScores, Draws: prevScores.Draws + 1 }));
      drawSound.play(); // Play draw sound
      setTimeout(resetBoard, 2000);
    }
  }, [board]);

  const handleMove = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    // Removed AI move logic from here
  };

  const makeMove = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetBoard = () => {
    resetSound.play(); // Play reset sound
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  // Simple AI using Minimax Algorithm
  const getBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i]) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = calculateWinner(currentBoard);
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (!currentBoard.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = 'O';
          let score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = 'X';
          let score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const switchMode = () => {
    resetSound.play(); // Play reset sound
    setGameMode((prevMode) => (prevMode === 'single' ? 'multi' : 'single'));
    resetBoard();
  };

  // New useEffect for handling AI moves
  useEffect(() => {
    // Only trigger AI move in single-player mode and if it's AI's turn
    if (gameMode === 'single' && !isXNext && !winner) {
      const aiMove = getBestMove(board);
      if (aiMove !== -1) {
        // Adding a slight delay for better UX
        const aiMoveTimeout = setTimeout(() => {
          makeMove(aiMove);
        }, 500);

        // Cleanup timeout on unmount or when dependencies change
        return () => clearTimeout(aiMoveTimeout);
      }
    }
  }, [board, isXNext, gameMode, winner]);

  return (
    <div>
      <Header />
      <Container sx={{ textAlign: 'center', marginTop: 4, paddingBottom: '60px' }}>
        {/* Added paddingBottom to prevent content from being hidden behind the fixed footer */}
        <Scoreboard scores={scores} />
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            {winner
              ? winner === 'Draw'
                ? "It's a Draw!"
                : `Player ${winner} Wins!`
              : `Next Player: ${isXNext ? 'X' : 'O'}`}
          </Typography>
          <Board board={board} onMove={handleMove} />
        </Box>
        <Button variant="contained" color="secondary" onClick={resetBoard} sx={{ mr: 2 }}>
          Reset Game
        </Button>
        <Button variant="outlined" onClick={switchMode}>
          Switch to {gameMode === 'single' ? 'Multiplayer' : 'Single Player'}
        </Button>
      </Container>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default Home;
