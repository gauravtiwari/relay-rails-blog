CommentType = GraphQL::ObjectType.define do

  name "Comment"
  description "A comment to a post"

  interfaces [NodeIdentification.interface]
  # `id` exposes the UUID for fetching/re-fetching
  global_id_field :id

  # Exporse fields associated with this model
  field :body, types.String, "The main body of this comment"
  field :created_at, types.String, "The date on which the comment was posted"
  field :votes_count, types.String,  "The total number of votes on this comment"
  field :user, UserType, "Owner of this comment"

end
