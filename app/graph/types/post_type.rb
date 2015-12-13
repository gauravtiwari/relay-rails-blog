include ActionView::Helpers::TextHelper

PostType = GraphQL::ObjectType.define do
  name "Post"
  description "A single post entry"
  interfaces [NodeIdentification.interface]
  # `id` exposes the UUID
  global_id_field :id

  # Exporse fields associated with this model
  field :title, types.String, "The title of this post"
  field :slug, types.String, "The slug of this post"
  field :body, types.String,  "The body of this post"
  field :comments_count, types.String,  "The total numner of comments on this post"
  field :votes_count, types.String,  "The total numner of votes on this post"
  field :created_at, types.String, "The time at which this post was created"
  field :user, UserType, "Owner of this post"

  # Define a connection on comments
  connection :comments, CommentType.connection_type do
    description "All comments association with this post. Returns comments collection and accepts arguments."
    resolve ->(object, args, ctx){
      object.comments.includes(:user)
    }
  end

  # Custom field
  field :excerpt do
    type types.String
    description "The short description of this post"
    resolve -> (object, arguments, context) {
      truncate(object.body, length: 150, escape: false)
    }
  end

end
