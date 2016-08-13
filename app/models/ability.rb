class Ability
  include CanCan::Ability

  def initialize(user)
    alias_action :update, :destroy, to: :moderate

    if user.moderator?
      can :moderate, Comment
    else
      can :crud, :all
    end
  end
end
