# Generate a graphql type based on given model fields
UserType = User.to_graphql_type(
  [:name, :email, :username, :created_at],
  true
)

UserType.fields['is_moderator'] = GraphQL::Field.define do
  name('is_moderator')
  type types.Boolean
  description 'Return if a user is moderator'
  resolve ->(object, _args, _ctx) {
    object.roles.moderator?
  }
end
