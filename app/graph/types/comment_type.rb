CommentType = GraphQL::ObjectType.define do
  name "Comment"
  description "A comment to a post"

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('Comment')
  field :body, !types.String, "The body of this comment"
  field :user, !UserType, "User associated with this comment"
  field :post, !PostType, "Post associated with this comment"
end
