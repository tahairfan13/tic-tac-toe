import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameStarter = () => {
  const [games, setGames] = useState([]);

  // Fetch all games on component mount
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/games');
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games: ", error);
      }
    };

    fetchGames();
  }, []);

  const handleCreateGame = async () => {
    try {
      // Get CSRF token from meta tag
      const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute('content');
      
      // Include CSRF token in request headers
      const response = await axios.post('/games', {
        game: {
          player_x: 'Player 1',
          player_o: 'Player 2',
        },
      }, {
        headers: {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === "created") {
        window.location.href = `/games/${response.data.gameId}`;
      }
    } catch (error) {
      console.error("Error creating game: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateGame}>Start New Game</button>
      <h2>Available Games:</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id} onClick={() => window.location.href = `/games/${game.id}`}>
            Game ID: {game.id} - Status: {game.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameStarter;
