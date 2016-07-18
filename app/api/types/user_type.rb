# Initialize base type to define a UserType using given fields
UserType = Api::GenerateGraphqlType.new(User).with_fields(
  [:name, :email, :username, :created_at]
)
