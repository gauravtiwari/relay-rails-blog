class AddRolesToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :roles, :text, array: true, default: []
    add_index :users, :roles, using: :gin
  end
end
