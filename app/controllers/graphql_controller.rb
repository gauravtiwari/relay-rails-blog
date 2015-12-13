class GraphqlController < ApplicationController
  # Ignore CSRF, rely on some auth token
  protect_from_forgery :except => [:create]

  def create
    # TODO: Change it to auth token
    verified_user = User.find_by(id: request.env["HTTP_CURRENTUSERID"])
    result = RelaySchema.execute(params[:query], debug: true, variables: params[:variables], context: {current_user: verified_user})
    render json: result
  end

end
