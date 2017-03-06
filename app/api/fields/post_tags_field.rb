PostTagsField = GraphQL::Field.define do
  name('tags')
  type types[types.String]
  description 'List of tags for all posts'
  resolve ->(_object, _args, _ctx) {
    Post.pluck(:tags).flatten.uniq
  }
end
