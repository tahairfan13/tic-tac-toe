# app/models/game.rb
class Game < ApplicationRecord
    serialize :board, JSON
  
    # Assuming a 3x3 board
    after_initialize :set_defaults, unless: :persisted?
  
    def set_defaults
      self.board ||= Array.new(9, "")
      self.current_turn ||= "X"
    end
  
    def place_mark(position)
      return false if position < 0 || position > 8 || board[position].present?
      board[position] = current_turn
      self.current_turn = current_turn == "X" ? "O" : "X"
      save
    end
  
    def winner?
      winning_positions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], # Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], # Columns
        [0, 4, 8], [2, 4, 6]            # Diagonals
      ]
  
      winning_positions.any? do |positions|
        [board[positions[0]], board[positions[1]], board[positions[2]]].uniq.length == 1 && board[positions[0]].present?
      end
    end
  
    def draw?
      board.all?(&:present?) && !winner?
    end
  
    # Update status based on game outcome
    def update_status
      if winner?
        last_player = current_turn == "X" ? "O" : "X"
        self.status = "#{last_player} Wins!"
      elsif draw?
        self.status = "Draw"
      else
        self.status = "In Progress"
      end
    end
  end
  