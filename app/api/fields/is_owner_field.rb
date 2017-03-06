IsOwnerField = GraphQL::Field.define do
  name('is_owner')
  type(types.Boolean)
  description 'Is the comment belongs to current user?'
  resolve ->(comment, _arguments, ctx) {
    ctx[:current_user] ? comment.is_owner?(ctx[:current_user].id) : false
  }
end
