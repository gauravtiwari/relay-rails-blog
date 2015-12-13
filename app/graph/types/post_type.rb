include ActionView::Helpers::TextHelper

PostType = GraphQL::ObjectType.define do
  name "Post"
  description "A post entry"

  interfaces [NodeIdentification.interface]

  global_id_field :id
  field :title, types.String, "The title of this post"
  field :slug, types.String, "The slug of this post"
  field :body, types.String,  "The body of this post"
  field :comments_count, types.String,  "The total numner of comments on this post"
  field :votes_count, types.String,  "The total numner of votes on this post"
  field :created_at, types.String, "The time at which this post was created"
  field :user, UserType, "User of this post"

  connection :comments, CommentType.connection_type do
    resolve ->(object, args, ctx){
      object.fetch_comments
    }
  end

  field :user do
    type UserType
    resolve ->(object, args, ctx){
      object.fetch_user
    }
  end

  field :excerpt do
    type types.String
    description "The short description of this post"
    resolve -> (object, arguments, context) {
      truncate(object.body, length: 150, escape: false)
    }
  end

end
