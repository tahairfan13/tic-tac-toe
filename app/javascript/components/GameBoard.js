import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameBoard = ({ gameId, gameState }) => {
  const initialBoard = () => {
    if (typeof gameState.board === 'string') {
      // Assuming it's a JSON string representation of a flat array
      return JSON.parse(gameState.board).reduce((rows, key, index) => (index % 3 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
    } else if (Array.isArray(gameState.board) && gameState.board.length === 9) {
      // If it's a flat array, convert to 2D array
      return gameState.board.reduce((rows, key, index) => (index % 3 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
    }
    // Default to an empty 3x3 board if gameState.board is not in the expected format
    return Array(3).fill(null).map(() => Array(3).fill(null));
  };

  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState(gameState.currentTurn || 'X');
  const [winner, setWinner] = useState(null);
  const [gameStatus, setGameStatus] = useState(gameState.status || "In Progress");

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await axios.get(`/games/${gameId}/find_game`);
        const game = response.data;
        if (!game || !game.board) {
          console.error('Game or game.board is undefined:', game);
          return; // Exit the function if game.board is not available
        }
        // Update the board based on the game's current state
        const updatedBoard = [];
        for (let i = 0; i < game.board.length; i += 3) {
          const row = game.board.slice(i, i + 3).map(cell => cell === "" ? null : cell);
          updatedBoard.push(row);
        }
        setBoard(updatedBoard);
        setCurrentPlayer(game.current_turn);
  
        // Update the game status and winner (if any)
        setGameStatus(game.status); // Assuming `status` is part of your game object and accurately reflects the current state of the game
  
        // Optionally update winner based on the status, if you have a separate winner state
        if (game.status !== "In Progress") {
          setWinner(game.status); // This assumes your status might be something like "X Wins" or "Draw"
        }
      } catch (error) {
        console.error('Failed to fetch game state:', error);
      }
    };
  
    fetchGameState();
  }, [gameId]);
  

  const handleCellClick = async (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] || winner) {
      return;
    }
  
    const position = rowIndex * 3 + colIndex;
    const csrfToken = document.querySelector('[name=csrf-token]').content;
  
    try {
      const response = await axios.patch(`/games/${gameId}`, {
        position: position,
      }, {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      });
  
      // Assuming the backend sends the updated board and current turn in the response
      const { board: updatedBoardArray, current_turn: updatedCurrentTurn, status: updatedStatus } = response.data;
      // Convert the updated game board (a flat array) back to a 2D array for the frontend
      const updatedBoard = updatedBoardArray.reduce((rows, key, index) => {
        if (index % 3 === 0) rows.push([key]);
        else rows[rows.length - 1].push(key);
        return rows;
      }, []);

      // Update local state with the new game state
      setBoard(updatedBoard);
      setCurrentPlayer(updatedCurrentTurn);
      setGameStatus(updatedStatus); 
      if (updatedStatus !== "In Progress") {
        setWinner(updatedStatus); // This will hold the string like "X Wins!", "Draw", or similar based on your backend logic
      }
  
    } catch (error) {
      console.error("Error updating game: ", error);
    }
  };  


  const checkForWinner = (board) => {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (board[row][0] && board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
        return board[row][0];
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (board[0][col] && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
        return board[0][col];
      }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return board[0][2];
    }

    // Check for tie (if no nulls found in board, it's a tie)
    const isTie = board.every(row => row.every(cell => cell !== null));
    if (isTie) {
      return 'Tie';
    }

    // No winner and no tie
    return null;
  };

  return (
    <>
      <div>
        {winner && <div>{winner === 'Tie' ? 'The game is a tie!' : `${winner}`}</div>}
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{
                  width: '60px',
                  height: '60px',
                  border: '1px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <a href="/">Back to Home</a>
      </div>
    </>
  );
  
};

export default GameBoard;
