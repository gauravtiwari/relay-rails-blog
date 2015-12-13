ViewerType = GraphQL::ObjectType.define do
  name 'Viewer'
  description 'Unassociated root queries'

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('Viewer')

  connection :posts, PostType.connection_type do
    # Add pagination:
    argument :page, types.Int

    resolve ->(object, args, ctx){
      Post.includes(:user, :comments).paginate(per_page: 20, page: args[:page])
    }
  end

  connection :users, UserType.connection_type do
    # Add pagination:
    argument :page, types.Int

    resolve ->(object, args, ctx){
      User.includes(:posts).paginate(per_page: 20, page: args[:page])
    }
  end

end
