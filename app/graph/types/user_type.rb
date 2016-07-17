UserType = BaseType.new(User).to_graphql_type(
  [:name, :email, :username, :created_at]
)
