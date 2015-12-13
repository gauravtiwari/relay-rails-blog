ViewerType = GraphQL::ObjectType.define do

  # Hack to support root queries
  name 'Viewer'
  description 'Support unassociated root queries that fetches collections. Supports fetching posts and users collection'
  interfaces [NodeIdentification.interface]

  # `id` exposes the UUID
  global_id_field :id

  # Fetch all posts
  connection :posts, PostType.connection_type do
    description 'Post connection to fetch paginated posts collection. Supports below aruguments'
    # Add pagination: // TODO
    argument :page, types.Int

    resolve ->(object, args, ctx){
      Post.includes(:user, :comments).paginate(per_page: 20, page: args[:page])
    }
  end

  # Fetch all users
  connection :users, UserType.connection_type do
    description 'Users connection to fetch paginated users collection. Supports below aruguments'
    # Add pagination: // TODO
    argument :page, types.Int

    resolve ->(object, args, ctx){
      User.includes(:posts).paginate(per_page: 20, page: args[:page])
    }
  end

end
