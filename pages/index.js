// pages/index.js

import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import Header from '../components/Header';
import Board from '../components/Board';
import Scoreboard from '../components/Scoreboard';
import { calculateWinner } from '../utils/gameLogic';
import { winSound, drawSound, resetSound } from '../utils/sound'; // Import sounds

const Home = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('single'); // 'single' or 'multi'
  const [player, setPlayer] = useState('X'); // Only for multiplayer

  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
      setScores((prevScores) => ({ ...prevScores, [win]: prevScores[win] + 1 }));
      setTimeout(resetBoard, 2000);
    } else if (!board.includes(null)) {
      setWinner('Draw');
      setScores((prevScores) => ({ ...prevScores, Draws: prevScores.Draws + 1 }));
      setTimeout(resetBoard, 2000);
    }
  }, [board]);

  const handleMove = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (gameMode === 'single') {
      // AI Move
      const aiMove = getBestMove(newBoard);
      if (aiMove !== -1) {
        setTimeout(() => {
          makeMove(aiMove);
        }, 500);
      }
    }
  };

  const makeMove = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetBoard = () => {
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
    setGameMode((prevMode) => (prevMode === 'single' ? 'multi' : 'single'));
    resetBoard();
  };

  return (
    <div>
      <Header />
      <Container sx={{ textAlign: 'center', marginTop: 4 }}>
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
    </div>
  );
};

export default Home;

