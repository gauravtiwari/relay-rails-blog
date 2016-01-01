module CommentMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateComment"

    input_field :post_id, !types.ID
    input_field :body, !types.String

    return_field :commentEdge, CommentType.edge_type
    return_field :post, PostType

    resolve -> (inputs, ctx) {
      post = NodeIdentification.object_from_id_proc.call(inputs[:post_id], ctx)
      user = ctx[:current_user]
      comment = post.comments.create({
        body: inputs[:body],
        user: user
      })

      connection = GraphQL::Relay::RelationConnection.new(post, {})
      edge = GraphQL::Relay::Edge.new(comment, connection)

      { post: post, commentEdge: edge }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyComment"

    input_field :id, !types.ID
    input_field :post_id, !types.ID

    return_field :deletedId, !types.ID
    return_field :post, PostType

    resolve -> (inputs, ctx) {
     post = NodeIdentification.object_from_id_proc.call(inputs[:post_id], ctx)
     comment = NodeIdentification.object_from_id_proc.call(inputs[:id], ctx)

     comment.destroy

     { post: post, deletedId: inputs[:id] }
   }
  end

  Edit = GraphQL::Relay::Mutation.define do
    name "EditComment"

    input_field :id, !types.ID
    input_field :body, !types.String

    return_field :comment, CommentType

    resolve -> (inputs, ctx) {
      comment = NodeIdentification.object_from_id_proc.call(inputs[:id], ctx)
      valid_inputs = inputs.instance_variable_get(:@values).select { |k, _| item.respond_to? "#{k}=" }.except('id')
        comment.update(valid_inputs)
      { comment: comment }
    }
  end
end

