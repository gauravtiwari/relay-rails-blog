class PagesController < ApplicationController
  protect_from_forgery with: :null_session

  def home
  end

  def editor
    render :layout => 'editor'
  end

end
