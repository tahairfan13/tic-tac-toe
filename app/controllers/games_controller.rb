class GamesController < ApplicationController
    before_action :set_game, only: %i[show update find_game]

    def index
        @games = Game.all
        render json: @games
    end
  
    # POST /games
    def create
        @game = Game.new(game_params)
        
        if @game.save
          render json: { status: :created, location: game_path(@game), gameId: @game.id }
        else
          render json: @game.errors, status: :unprocessable_entity
        end
    end
  
    # GET /games/:id
    def show
    end
  
    def find_game
      render json: @game
    end
    # PATCH/PUT /games/:id
    def update
        position = params[:position].to_i
    
        unless @game.place_mark(position)
          render json: { error: "Invalid move" }, status: :unprocessable_entity and return
        end
    
        @game.update_status
    
        if @game.save
          render json: @game
        else
          render json: @game.errors, status: :unprocessable_entity
        end
    end
  
    private

      def set_game
        @game = Game.find(params[:id])
      end
  
      def game_params
        params.require(:game).permit(:player_x, :player_o, :current_turn, :status, :board)
      end
  end
  