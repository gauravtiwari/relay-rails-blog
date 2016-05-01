module PostMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreatePost"
    description "Create Post"

    # Define input parameters
    input_field :title, !types.String
    input_field :excerpt, !types.String
    input_field :body, !types.String
    input_field :viewer_id, !types.ID

    return_field :postEdge, PostType.edge_type
    return_field :viewer, ViewerType

    # Resolve block to create Post and return hash of post and Post
    resolve -> (inputs, ctx) {
      user = ctx[:current_user]
      viewer = Viewer::STATIC
      post = user.posts.create({
        title: inputs[:title],
        excerpt: inputs[:excerpt],
        body: inputs[:body],
        user: user
      })

      connection = GraphQL::Relay::RelationConnection.new(viewer, {})
      edge = GraphQL::Relay::Edge.new(post, connection)

      {
        viewer: viewer,
        postEdge: edge
      }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyPost"
    description "Delete a Post"

    # Define input parameters
    input_field :id, !types.ID

    # Define return parameters
    return_field :deletedId, !types.ID
    return_field :post, PostType

    resolve -> (inputs, ctx) {
     post = NodeIdentification.object_from_id(inputs[:id], ctx)
     post.destroy

     {
       post: post.reload,
       deletedId: inputs[:id]
     }
   }
  end

  Edit = GraphQL::Relay::Mutation.define do
    name "EditPost"
    description "Edit a Post and return Post"

    # Define input parameters
    input_field :id, !types.ID

    # Define return parameters
    return_field :post, PostType

    resolve -> (inputs, ctx) {
      post = NodeIdentification.object_from_id(inputs[:id], ctx)
      valid_inputs = inputs.instance_variable_get(:@argument_values).select {
        |k, _| post.respond_to? "#{k}="
      }.except('id')

      post.update(valid_inputs)

      { post: post }
    }
  end
end
