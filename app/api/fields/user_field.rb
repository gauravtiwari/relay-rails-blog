UserField = GraphQL::Field.define do
  name('user')
  type(UserType)
  description('The user of the comment')
end
