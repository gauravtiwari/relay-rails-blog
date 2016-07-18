# Generate a graphql type based on given model fields
UserType = Api::GenerateGraphqlType.new(User).with_fields(
  [:name, :email, :username, :created_at]
)
