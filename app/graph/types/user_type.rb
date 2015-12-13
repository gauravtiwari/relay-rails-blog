UserType = GraphQL::ObjectType.define do
  name "User"
  description "An user entry, returns basic user information"

  interfaces [NodeIdentification.interface]
  # `id` exposes the UUID
  global_id_field :id

  # Expose fields from the model
  field :name, types.String, "The name of this user"
  field :email, types.String,  "The email of this user"
  field :created_at, types.String,  "The date this user created an account"

end
