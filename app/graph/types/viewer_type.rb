ViewerType = GraphQL::ObjectType.define do

  # Hack to support root queries
  name 'Viewer'
  description 'Support unassociated root queries that fetches collections. Supports fetching posts and users collection'
  interfaces [NodeIdentification.interface]

  # `id` exposes the UUID
  global_id_field :id

  # Fetch all posts
  connection :posts, PostType.connection_type do
    argument :filter, types.String
    description 'Post connection to fetch paginated posts collection.'
    resolve ->(object, args, ctx){
      args["filter"] ? Post.send(args["filter"]).includes(:user) : Post.includes(:user)
    }
  end

end
