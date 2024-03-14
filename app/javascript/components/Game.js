// Adjustments to the Game.js component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameBoard from './GameBoard';

export default function Game(props) {
  const [gameId, setGameId] = useState(props.gameId);
  const [game, setGame] = useState(null);

  // Fetch game state when component mounts
  useEffect(() => {
    const fetchGame = async () => {
      const response = await axios.get(`/games/${gameId}`);
      setGame(response.data);
    };

    fetchGame();
  }, [gameId]);

  const makeMove = async (position) => {
    try {
      const response = await axios.put(`/games/${gameId}`, { position });
      setGame(response.data); // Update local game state with the response
    } catch (error) {
      console.error("Error making move: ", error);
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <GameBoard squares={game.board.split('')} onClick={(i) => makeMove(i)} />
      {/* Display current player and status */}
      <div>Current turn: {game.current_turn}</div>
      <div>Status: {game.status}</div>
    </div>
  );
}
