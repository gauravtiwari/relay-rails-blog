class VotePolicy < ApplicationPolicy
  def destroy?
    user == record.user
  end
end
