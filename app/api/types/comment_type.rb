# Generate a graphql type based on given model fields
CommentType = Comment.to_graphql_type(
  [:body, :votes_count, :created_at],
  true
)

# Add custom fields and connection to the CommentType
CommentType.fields['user'] = UserField
CommentType.fields['voted'] = VotedField
CommentType.fields['is_owner'] = IsOwnerField
