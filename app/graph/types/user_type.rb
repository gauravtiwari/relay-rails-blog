UserType = GraphQL::ObjectType.define do
  name "User"
  description "A user entry"

  interfaces [NodeIdentification.interface]

  global_id_field :id
  field :name, types.String, "The name of this user"
  field :email, types.String,  "The email of this user"
  field :created_at, types.String,  "The date this user joined"
end
