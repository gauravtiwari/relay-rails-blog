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
    resolve ->(object, args, ctx){
      Post.includes(:user, :comments)
    }
  end

  # Fetch all users
  connection :users, UserType.connection_type do
    description 'Users connection to fetch paginated users collection. Supports below aruguments'
    resolve ->(object, args, ctx){
      User.includes(:posts)
    }
  end

end
