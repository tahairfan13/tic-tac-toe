# Tic Tac Toe Application

This is a Tic Tac Toe application built on Rails and React. It allows users to play the classic game of Tic Tac Toe and keeps track of previous games, enabling users to replay them whenever they want.

## Features

- **Play Tic Tac Toe:** Users can play the game against each other.
- **Track Previous Games:** The application keeps a record of all previous games.
- **Replay Games:** Users can revisit and replay any of their previous games.

![Tic Tac Toe Screenshot](https://github.com/tahairfan13/tic-tac-toe/blob/main/Screenshot%202024-04-03%20at%202.38.44%20PM.png)

## How to Play

1. **Start a New Game:** Users can start a new game of Tic Tac Toe.
2. **Play the Game:** Users take turns marking the spaces on the board with their respective symbols (X or O).
3. **View Previous Games:** Users can view their previous games and replay them if desired.

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/your_username/tic-tac-toe.git
    ```

2. Navigate to the project directory:

    ```
    cd tic-tac-toe
    ```

3. Install Rails dependencies:

    ```
    bundle install
    ```

4. Install React dependencies:

    ```
    yarn
    ```

5. Set up the database:

    ```
    rails db:create
    rails db:migrate
    ```

6. Start the Rails server:

    ```
    rails server
    ```

7. Visit `http://localhost:3000` in your browser to access the application.

## Technologies Used

- **Ruby on Rails:** Framework for building web applications.
- **React:** JavaScript library for building user interfaces.
- **HTML/CSS:** For the user interface.
- **Sqlite:** Database for storing game data.

## Contributors

- Taha Ali Irfan (@tahairfan13)

## License

This project is licensed under the [MIT License](LICENSE).
