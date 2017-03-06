CommentsField = GraphQL::Field.define do
  name('comments')
  argument(:order, types.String, default_value: 'id')
  type(CommentType.connection_type)
  description('The comments associated with the post')
  resolve ->(obj, args, _ctx) {
    obj.comments.includes(:user).order(args[:order])
  }
end
