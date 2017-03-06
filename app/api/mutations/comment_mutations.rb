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
    resolve ->(_obj, inputs, ctx) {
      post = RelaySchema.object_from_id(inputs[:post_id], ctx)
      validate_object(post, 'Post')

      user = ctx[:current_user]
      comment = post.comments.create(body: inputs[:body],
                                     user: user)

      comments_connection = GraphQL::Relay::RelationConnection.new(
        post.comments,
        {}
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

    resolve ->(_obj, inputs, ctx) {
              post = RelaySchema.object_from_id(inputs[:post_id], ctx)
              validate_object(post, 'Post')

              comment = RelaySchema.object_from_id(inputs[:id], ctx)
              validate_object(comment, 'Comment')

              authorize(ctx[:current_user], comment, :destroy)
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

    resolve ->(_obj, inputs, ctx) {
      comment = RelaySchema.object_from_id(inputs[:id], ctx)

      validate_object(comment, 'Comment')
      authorize(ctx[:current_user], comment, :edit)

      valid_inputs = ActiveSupport::HashWithIndifferentAccess.new(
        inputs.instance_variable_get(
          :@original_values
        ).select do |k, _|
          comment.respond_to? "#{k}="
        end
      ).except(:id)

      comment.update(valid_inputs)

      { comment: comment }
    }
  end
end
