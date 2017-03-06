class User < ApplicationRecord
  include Graphqlable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Associations
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :votes, dependent: :destroy

  extend Enumerize
  enumerize :roles, in: [
    :user,
    :moderator
  ], default: :user, multiple: true
end
