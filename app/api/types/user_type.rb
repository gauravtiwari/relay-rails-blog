# Generate a graphql type based on given model fields
UserType = User.to_graphql_type(
  [:name, :email, :username, :created_at]
)
