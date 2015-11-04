UserType = GraphQL::ObjectType.define do
  name "User"
  description "A user entry"

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('User')
  field :name, types.String, "The name of this user"
  field :email, types.String,  "The email of this user"

  field :posts, -> { !types[!PostType] }, "All posts of this user"
  field :comments, -> { !types[!CommentType] }, "All comments of this user"


end
