# Initialize base type to define a UserType using given fields
UserType = DefineType.new(User).to_graphql_type(
  [:name, :email, :username, :created_at]
)
