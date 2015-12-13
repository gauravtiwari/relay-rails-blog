CommentType = GraphQL::ObjectType.define do
  name "Comment"
  description "A comment to a post"

  interfaces [NodeIdentification.interface]

  global_id_field :id
  field :body, types.String, "The body of this comment"
  field :votes_count, types.String,  "The total number of votes on this comment"
  field :user, UserType, "User of this post"
end
