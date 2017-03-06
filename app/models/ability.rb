class Ability
  include CanCan::Ability

  def initialize(user)
    can :manage, [Post, Comment, Vote], user_id: user.id
  end
end
