# Generate a graphql type based on given model fields
CommentType = Api::GenerateGraphqlType.new(Comment).with_fields(
  [:body, :votes_count, :created_at]
)

# Add custom fields and connection to the CommentType
CommentType.fields['user'] = UserField
CommentType.fields['voted'] = VotedField
CommentType.fields['is_owner'] = IsOwnerField
