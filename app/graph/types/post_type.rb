PostType = GraphQL::ObjectType.define do
  name "Post"
  description "A single post entry returns a post with author, total votes and comments"
  interfaces [NodeIdentification.interface]
  # `id` exposes the UUID
  global_id_field :id

  # Expose fields associated with Post model
  field :title, types.String, "The title of this post"
  field :slug, types.String, "The slug of this post"
  field :body, types.String, "The body of this post"
  field :excerpt, types.String, "The short description of this post"
  field :comments_count, types.String,  "The total numner of comments on this post"
  field :votes_count, types.String,  "The total numner of votes on this post"
  field :created_at, types.String, "The time at which this post was created"
  field :user, UserType, "Owner of this post"
  field :tags, types[types.String], "List of tags for the post"

  # Define a connection on comments
  connection :comments, CommentType.connection_type do
    description "All comments association with this post. Returns comments collection and accepts arguments."
    resolve ->(post, args, ctx){
      post.comments.includes(:user)
    }
  end

  # Custom field using resolve block
  field :voted do
    type types.Boolean
    description "Is this post voted by current user?"
    resolve -> (post, arguments, ctx) {
      ctx[:current_user] ? post.voted?(ctx[:current_user].id) : false
    }
  end
end
