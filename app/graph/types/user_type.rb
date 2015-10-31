UserType = GraphQL::ObjectType.define do
  name "User"
  description "An user entry"

  field :id, !types.ID, "The unique ID for this user"
  field :name, !types.String, "The name of this user"
  field :email, !types.String,  "The email of this user"
  field :posts, types[!PostType]
end
