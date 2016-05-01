class GraphqlController < ApplicationController
  before_action :set_current_user

  def create
    result = RelaySchema.execute(
      params[:query],
      variables: ensure_hash(params[:variables]),
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

  def ensure_hash(query_variables)
    if query_variables.blank?
      {}
    elsif query_variables.is_a?(String)
      JSON.parse(query_variables)
    else
      query_variables
    end
  end
end
