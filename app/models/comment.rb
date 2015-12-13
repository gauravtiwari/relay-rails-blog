class Comment < ActiveRecord::Base

  include IdentityCache
  belongs_to :user
  belongs_to :post, touch: true, counter_cache: true
  has_many :votes, as: :votable

  cache_belongs_to :user

  # Common Concern
  include Votable

  # Basic validation
  validates_presence_of :body, :user_id, :post_id

end
