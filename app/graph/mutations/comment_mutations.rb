module CommentMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateComment"

    input_field :post_id, !types.ID
    input_field :user_id, !types.ID
    input_field :body, !types.String

    return_field :commentEdge, CommentType.edge_type
    return_field :comment, CommentType

    resolve -> (inputs, ctx) {
      post = NodeIdentification.object_from_id_proc.call(inputs[:post_id])
      comment = post.comments.create({body: inputs[:body], user_id: inputs[:user_id]})

      connection = GraphQL::Relay::RelationConnection.new(post, {})
      edge = GraphQL::Relay::Edge.new(comment, connection)

      { post: post, commentEdge: edge }
    }
  end

  Edit = GraphQL::Relay::Mutation.define do
    name "EditComment"

    input_field :id, !types.ID
    input_field :body, !types.String

    return_field :comment, CommentType

    resolve -> (inputs, ctx) {
      comment = NodeIdentification.object_from_id_proc.call(inputs[:id])
      valid_inputs = inputs.instance_variable_get(:@values).select { |k, _| comment.respond_to? "#{k}=" }.except('id')
      comment.update(valid_inputs)
      { comment: comment }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyComment"

    input_field :id, !types.ID
    input_field :post_id, !types.ID

    return_field :deletedId, !types.ID
    return_field :post, PostType

    resolve -> (inputs, ctx) {
      post = NodeIdentification.object_from_id_proc.call(inputs[:post_id])
      comment = NodeIdentification.object_from_id_proc.call(inputs[:id])
      comment.destroy
      { post: post, deletedId: inputs[:id] }
    }
  end
end
