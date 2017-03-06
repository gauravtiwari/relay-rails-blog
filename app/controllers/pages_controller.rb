class PagesController < ApplicationController
  protect_from_forgery with: :null_session

  def home; end
end
