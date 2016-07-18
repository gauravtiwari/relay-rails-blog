class Comment < ApplicationRecord
  include Graphqlable
  # Associations
  belongs_to :user
  belongs_to :post, touch: true, counter_cache: true
  has_many :votes, as: :votable, dependent: :destroy

  # Common Concern
  include Votable

  # Basic validation
  validates_presence_of :body, :user_id, :post_id

  def is_owner?(current_user_id)
    user.id == current_user_id
  end
end
