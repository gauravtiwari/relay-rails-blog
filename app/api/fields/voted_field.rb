VotedField = GraphQL::Field.define do
  name('voted')
  type(types.Boolean)
  description('Is this record voted by current user?')
  resolve ->(obj, _arguments, ctx) {
    ctx[:current_user] ? obj.voted?(ctx[:current_user].id) : false
  }
end
