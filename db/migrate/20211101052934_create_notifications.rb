class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.integer :recipient_id
      t.references :user, null: false, foreign_key: true
      t.integer :game_id    
      t.string :action
      t.timestamps
    end
  end
end
