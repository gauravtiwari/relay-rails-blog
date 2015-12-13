class PostsController < ApplicationController
  def show
    puts cookies.signed['user.id']
  end
end
