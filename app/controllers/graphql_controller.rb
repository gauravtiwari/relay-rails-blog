class GraphqlController < ApplicationController
  # Ignore CSRF, rely on some auth token
  protect_from_forgery :except => [:create]

  def create
    puts '-' * 100, RelaySchema.prettify(params[:query]), '-' * 100
    result = RelaySchema.execute(params[:query], debug: true, variables: params[:variables])
    render json: result
  end

end
