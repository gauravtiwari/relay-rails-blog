PostsField = GraphQL::Field.define do
  name('posts')
  argument :filter, types.String, default_value: nil
  argument :tag, types.String, default_value: nil
  argument :order, types.String, default_value: '-id'
  type(PostType.connection_type)

  description 'Post connection to fetch paginated posts collection.'

  # Custom resolver
  resolve(PostsResolver.new)
end
