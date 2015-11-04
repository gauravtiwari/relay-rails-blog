RootLevelType = GraphQL::ObjectType.define do
  name 'RootLevel'
  description 'Unassociated root object queries'

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('RootLevel')

  connection :Posts, PostType.connection_type do
    resolve ->(object, args, ctx){
      Post.all
    }
  end

  connection :users, UserType.connection_type do
    resolve ->(object, args, ctx){
      User.all
    }
  end
end
