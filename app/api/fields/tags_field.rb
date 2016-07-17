TagsField = GraphQL::Field.define do
  name('tags')
  type(types[types.String])
  description 'The tags associated with the post'
end
