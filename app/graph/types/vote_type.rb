VoteType = GraphQL::ObjectType.define do
  name "Vote"
  description "A vote to a votable object"

  interfaces [NodeIdentification.interface]

  global_id_field :id
  field :user, UserType, "User of this post"
  field :votable, -> { PostType }, "Responses to this post"
end
