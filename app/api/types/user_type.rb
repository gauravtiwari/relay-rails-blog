# Initialize base type to define a UserType using given fields
UserType = BaseType.new(User).to_graphql_type(
  [:name, :email, :username, :created_at]
)
