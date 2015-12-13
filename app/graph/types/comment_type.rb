CommentType = GraphQL::ObjectType.define do

  name "Comment"
  description "A single comment entry returns a comment with author and total votes"

  interfaces [NodeIdentification.interface]
  # `id` exposes the UUID for fetching/re-fetching
  global_id_field :id

  # Expose fields associated with Comment model
  field :body, types.String, "The main body of this comment"
  field :created_at, types.String, "The date on which the comment was posted"
  field :votes_count, types.String,  "The total number of votes on this comment"
  field :user, UserType, "Owner of this comment"

end
