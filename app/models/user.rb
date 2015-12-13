class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  has_many :posts
  has_many :comments

end
