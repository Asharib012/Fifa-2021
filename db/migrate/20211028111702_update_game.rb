class UpdateGame < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :home_team_img, :string
    add_column :games, :away_team_img, :string
    add_column :games, :home_team, :string
    add_column :games, :away_team, :string
    add_column :games, :datetime, :datetime
  end
end
