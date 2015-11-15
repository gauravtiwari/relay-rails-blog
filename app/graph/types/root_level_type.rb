RootLevelType = GraphQL::ObjectType.define do
  name 'RootLevel'
  description 'Unassociated root object queries'

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('RootLevel')

  field :posts do
    type types[PostType]
    description "Get all posts"
    resolve ->(object, args, ctx){
      Post.includes(:user, :comments).all
    }
  end

  field :users do
    type types[UserType]
    description "Get all users"
    resolve ->(object, args, ctx){
      User.includes(:posts, :comments).all
    }
  end

end
