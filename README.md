# Overview

Thank you for interviewing with ShopHire!

This assessment is designed to test some of your real-world coding skills. There are a set of tasks outlined for you to complete.
Complete as many of them as you can in 1 hour, using best practices. You DO NOT have to finish all of the tasks to be successful.

## Requirements

`ruby 3.2.3`

## Assignment

You have been given a very basic version of a [tic tac toe](https://en.wikipedia.org/wiki/Tic-tac-toe) game.

You can run the server using `bundle exec rails s` after you've installed the dependencies.

If you have never played before or if it's been a while, check out this version: https://playtictactoe.org/. Your tasks are designed to build out a fully functioning tic tac toe game.

For each task, remember to use best practices (e.g. add testing or docs for really tricky functions, etc.). Also keep in mind that you do not have to finish all of the tasks.

To start, create a fork of this repo. Then, create a separate branch to organize your changes. Once you're done with the assessment, create a pull request against the forked repo with your changes. When creating the pull request please note the changes you're making as if it were a real production pull request.

## Tasks

1. The UI is currently very barebones. Add some simple styling that will render each token in its own box in a 3x3 grid. View an example [here](https://en.wikipedia.org/wiki/Tic-tac-toe#/media/File:Tic_tac_toe.svg).

2. All of the tokens are hard-coded. Add the ability for a player to click on a square to assign a token. Remember to toggle the token between turns (first click should be "X" then "O", etc.).

3. Now let's add the ability to determine a winner. Whenever a user clicks a square send the state of the board to the Rails backend to see if the game is over and who won. If the game is over then players should no longer be able to change squares. If there is a winner, then we should see a message (e.g. "X Wins" or "O Wins"). For a tie game, write "No Winner").

[Optional] Only if you have extra time after completing the first 3 steps should you attempt this.

4. Now, instead of a human player going second, there should be a backend-driven AI. Let "X" go first and be the human, but whenever "O" goes, then a function call should be made to the backend to choose the next square. Use whatever strategy you like to choose the square.

## Evaluation

You'll be evaluated along several dimensions:
* How well you followed the instructions
* Whether the game works as desired
* How well structured and tested your code is
