CommentType = GraphQL::ObjectType.define do
  name "Comment"
  description "A comment to a post"

  field :id, !types.ID, "The unique ID of this comment"
  field :body, !types.String, "The body of this comment"
  field :post, !PostType, "The post this comment belongs to"
end
