class Vote < ApplicationRecord

  # Associations
  belongs_to :user
  belongs_to :votable, polymorphic: true, touch: true, counter_cache: true

  # Callbacks
  after_commit :cache_voter, on: :create
  after_destroy :delete_voter

  private

  def cache_voter
    votable.voter_ids.push(user_id)
    votable.save
  end

  def delete_voter
    votable.voter_ids.delete(user_id.to_s)
    votable.save
  end

end
