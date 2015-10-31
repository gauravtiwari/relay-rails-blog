PostType = GraphQL::ObjectType.define do
  name "Post"
  description "A post entry"

  field :id, !types.ID, "The unique ID for this post"
  field :title, !types.String, "The title of this post"
  field :body, !types.String,  "The body of this post"
  field :post, !UserType, "The user this post belongs to"
  field :comments, types[!CommentType]
end
