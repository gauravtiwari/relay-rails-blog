include ActionView::Helpers::TextHelper

CommentType = GraphQL::ObjectType.define do

  name "Comment"
  description "A single comment entry returns a comment with author and total votes"

  interfaces [NodeIdentification.interface]
  # `id` exposes the UUID for fetching/re-fetching
  global_id_field :id

  # Expose fields associated with Comment model
  field :created_at, types.String, "The date on which the comment was posted"
  field :votes_count, types.String,  "The total number of votes on this comment"
  field :user, UserType, "Owner of this comment"

  # Custom field using resolve block
  field :voted do
    type types.Boolean
    description "The short description of this post"
    resolve -> (comment, arguments, ctx) {
      ctx[:current_user] ? comment.voted?(ctx[:current_user].id) : false
    }
  end

  field :body do
    type types.String
    description "The body of this comment"
    resolve -> (comment, arguments, ctx) {
      simple_format(comment.body)
    }
  end
end
