module Votable

  extend ActiveSupport::Concern

  def voted? user_id
    voter_ids.include? user_id.to_s
  end

end
