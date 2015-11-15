QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema"

  field :node, field: NodeIdentification.field

  field :root, RootLevelType do
    resolve -> (obj, args, ctx) { RootLevel::STATIC }
  end

  field :post do
    type PostType
    description "Find a Post by id"
    argument :id, types.ID
    resolve -> (object, arguments, context) {
      Post.includes(:user, :comments).find(arguments["id"])
    }
  end

  field :user do
    type UserType
    description "Find a User by id"
    argument :id, types.ID
    resolve -> (object, arguments, context) {
      User.includes(:posts, :comments).find(arguments["id"])
    }
  end

  field :current_user, UserType do
    resolve -> (obj, args, ctx) { User.first }
  end
end
