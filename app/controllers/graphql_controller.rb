class GraphqlController < ApplicationController
  # Ignore CSRF, rely on some auth token
  protect_from_forgery :except => [:create]
  before_action :set_current_user

  def create
    result = RelaySchema.execute(
      params[:query],
      debug: true,
      variables: params[:variables],
      context: {
        current_user: set_current_user
      }
    )
    render json: result
  end

  private

  def set_current_user
    if verified_user = User.find_by(id: cookies.signed['user.id'])
      verified_user
    else
      nil
    end
  end

end
