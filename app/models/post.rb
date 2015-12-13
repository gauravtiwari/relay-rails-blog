class Post < ActiveRecord::Base

  include IdentityCache
  acts_as_url :title, url_attribute: :slug
  belongs_to :user
  has_many :comments
  has_many :votes, as: :votable

  # Common Concern
  include Votable

  cache_has_many :comments, :embed => true
  cache_belongs_to :user

  # Basic validation
  validates_presence_of :body, :user_id, :slug

  def to_param
    slug # or whatever you set :url_attribute to
  end

end
