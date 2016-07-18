# Generate a graphql type based on given model fields
PostType = Api::GenerateGraphqlType.new(Post).with_fields(
  [:title, :slug, :user_id, :body, :excerpt, :comments_count,
  :votes_count, :created_at]
)

# Add custom fields and connection to the PostType
PostType.fields['user'] = UserField
PostType.fields['voted'] = VotedField
PostType.fields['tags'] = TagsField
PostType.fields['comments'] = GraphQL::Relay::ConnectionField.create(
  CommentsField
)
