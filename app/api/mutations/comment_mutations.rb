module CommentMutations
  Create = GraphQL::Relay::Mutation.define do
    name 'CreateComment'
    description 'Create comment for a post and return post and new comment'

    # Define input parameters
    input_field :post_id, !types.ID
    input_field :body, !types.String

    # Define return parameters
    return_field :commentEdge, CommentType.edge_type
    return_field :post, PostType

    # Resolve block to create comment and return hash of post and comment
    resolve -> (inputs, ctx) {
      post = NodeIdentification.object_from_id(inputs[:post_id], ctx)
      user = ctx[:current_user]
      comment = post.comments.create({
        body: inputs[:body],
        user: user
      })

      comments_connection = GraphQL::Relay::RelationConnection.new(
        post.comments,
        {},
        field: nil
      )

      edge = GraphQL::Relay::Edge.new(comment, comments_connection)

      {
        post: post.reload,
        commentEdge: edge
      }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name 'DestroyComment'
    description 'Delete a comment and return post and deleted comment ID'

    # Define input parameters
    input_field :id, !types.ID
    input_field :post_id, !types.ID

    # Define return parameters
    return_field :deletedId, !types.ID
    return_field :post, PostType

    resolve -> (inputs, ctx) {
     post = NodeIdentification.object_from_id(inputs[:post_id], ctx)
     comment = NodeIdentification.object_from_id(inputs[:id], ctx)
     comment.destroy

     {
       post: post.reload,
       deletedId: inputs[:id]
     }
   }
  end

  Edit = GraphQL::Relay::Mutation.define do
    name 'EditComment'
    description 'Edit a comment and return comment'

    # Define input parameters
    input_field :id, !types.ID
    input_field :body, !types.String

    # Define return parameters
    return_field :comment, CommentType

    resolve -> (inputs, ctx) {
      comment = NodeIdentification.object_from_id(inputs[:id], ctx)
      valid_inputs = inputs.instance_variable_get(:@argument_values).select {
        |k, _| comment.respond_to? "#{k}="
      }.except('id')

      comment.update(valid_inputs)

      { comment: comment }
    }
  end
end
