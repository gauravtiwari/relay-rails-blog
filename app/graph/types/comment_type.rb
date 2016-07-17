# Initialize base type to define a type using given fields
CommentType = BaseType.new(Comment).to_graphql_type(
  [:body, :votes_count, :created_at]
)

# Add custom fields and connection to the PostType
CommentType.fields['user'] = UserField
CommentType.fields['voted'] = VotedField
CommentType.fields['is_owner'] = IsOwnerField
