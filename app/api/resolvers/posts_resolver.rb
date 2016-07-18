class PostsResolver
  def call(_, args, _)
    if args[:tag]
      Post.where("'#{args[:tag]}' = ANY (tags)").includes(:user).order(args[:order])
    elsif args[:filter]
      Post.send(args[:filter]).includes(:user).order(args[:order])
    else
      Post.includes(:user).order(args[:order])
    end
  end
end
