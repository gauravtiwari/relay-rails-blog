module PostMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreatePost"

    input_field :body, !types.String
    input_field :user_id, !types.ID

    return_field :postEdge, PostType.edge_type
    return_field :root, RootLevelType

    resolve -> (inputs, ctx) {
      root = RootLevel::STATIC
      post = Post.create({body: inputs[:body], user_id: inputs[:user_id]})

      connection = GraphQL::Relay::RelationConnection.new(root, {})
      edge = GraphQL::Relay::Edge.new(post, connection)

      { root: root, postEdge: edge }
    }
  end

  Edit = GraphQL::Relay::Mutation.define do
    name "EditPost"

    input_field :id, !types.ID
    input_field :body, !types.String

    return_field :post, PostType

    resolve -> (inputs, ctx) {
      post = NodeIdentification.object_from_id_proc.call(inputs[:id])
      valid_inputs = inputs.instance_variable_get(:@values).select { |k, _| post.respond_to? "#{k}=" }.except('id')
      post.update(valid_inputs)
      { post: post }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyPost"

    input_field :id, !types.ID
    return_field :deletedId, !types.ID
    return_field :root, RootLevelType

    resolve -> (inputs, ctx) {
      post = NodeIdentification.object_from_id_proc.call(inputs[:id])
      post.destroy
      { root: RootLevel::STATIC, deletedId: inputs[:id] }
    }
  end
end
