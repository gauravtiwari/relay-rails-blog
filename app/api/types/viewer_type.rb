ViewerType = GraphQL::ObjectType.define do
  # Hack to support root queries
  name 'Viewer'
  description 'Support unassociated root queries that fetches collections.'
  interfaces [GraphQL::Relay::Node.interface]

  # `id` exposes the UUID
  global_id_field :id
end

ViewerType.fields['tags'] = PostTagsField
ViewerType.fields['current_user'] = CurrentUserField
ViewerType.fields['posts'] = GraphQL::Relay::ConnectionField.create(
  PostsField
)
