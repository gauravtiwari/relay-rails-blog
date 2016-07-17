PostsField = GraphQL::Field.define do
  name('posts')
  argument :filter, types.String, default_value: nil
  argument :tag, types.String, default_value: nil
  argument :order, types.String, default_value: 'id'
  type(PostType.connection_type)

  description 'Post connection to fetch paginated posts collection.'
  resolve ->(object, args, ctx) {
    if args[:tag]
      Post.where("'#{args[:tag]}' = ANY (tags)").includes(:user).order(args[:order])
    elsif args[:filter]
      Post.send(args[:filter]).includes(:user).order(args[:order])
    else
      Post.includes(:user).order(args[:order])
    end
  }
end
