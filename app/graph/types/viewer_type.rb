ViewerType = GraphQL::ObjectType.define do

  # Hack to support root queries
  name 'Viewer'
  description 'Support unassociated root queries that fetches collections. Supports fetching posts and users collection'
  interfaces [NodeIdentification.interface]

  # `id` exposes the UUID
  global_id_field :id

  # Fetch all posts
  connection :posts, PostType.connection_type do
    argument :filter, types.String, default_value: nil
    argument :tag, types.String, default_value: nil
    argument :order, types.String, default_value: "id"
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

  field :tags do
    type types[types.String]
    description "List of tags for the post"
    resolve -> (object, args, ctx) {
      Post.pluck(:tags).flatten.uniq
    }
  end

  # Current user hack // Check GraphQL controller
  field :current_user, UserType do
    description  "Returns current signed in user object"
    resolve -> (obj, args, ctx) {
      ctx[:current_user] ? ctx[:current_user] : nil
    }
  end

end
