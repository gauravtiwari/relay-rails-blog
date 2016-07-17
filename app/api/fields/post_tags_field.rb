PostTagsField = GraphQL::Field.define do
  name('tags')
  type types[types.String]
  description 'List of tags for all posts'
  resolve -> (object, args, ctx) {
    Post.pluck(:tags).flatten.uniq
  }
end
