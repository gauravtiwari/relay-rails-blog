class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :user, index: true, foreign_key: true
      t.references :votable, index: true, polymorphic: true


      t.timestamps
    end

    add_index :votes, [:votable_id, :votable_type, :user_id], unique: true
  end
end
