class GraphqlController < ApplicationController
  # Ignore CSRF, rely on some auth token
  protect_from_forgery :except => [:create]

  def create
    verified_user = User.find_by(id: cookies.signed["user.id"])
    result = RelaySchema.execute(params[:query], debug: true, variables: params[:variables], context: {current_user: verified_user})
    render json: result
  end

end
