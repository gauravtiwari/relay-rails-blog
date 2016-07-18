include ActionView::Helpers::TextHelper
class Post < ApplicationRecord
  include Graphqlable
  before_create :set_excerpt, unless: :excerpt?

  # Slug for posts
  acts_as_url :title, url_attribute: :slug

  # Associations
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :votes, as: :votable, dependent: :destroy

  # Common Concern
  include Votable

  # Basic validation
  validates_presence_of :body, :user_id, :slug

  def to_param
    slug # or whatever you set :url_attribute to
  end

  def self.popular
    order(votes_count: :desc, comments_count: :desc)
  end

  private

  def excerpt?
    excerpt.present?
  end

  def set_excerpt
    self.excerpt = truncate(body, length: 150, escape: true)
  end
end
