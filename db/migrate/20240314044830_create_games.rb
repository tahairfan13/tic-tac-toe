class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :player_x
      t.string :player_o
      t.string :current_turn
      t.string :status
      t.text :board

      t.timestamps
    end
  end
end
