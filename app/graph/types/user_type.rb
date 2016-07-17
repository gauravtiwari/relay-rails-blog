UserType = DynamicTypeDefinition.new(User).to_graphql_type(
  [:name, :email, :created_at],
  [
    {
      name: "user_name",
      type: :string
    }
  ]
)
