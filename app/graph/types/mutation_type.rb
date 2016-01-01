MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :EditComment, field: CommentMutations::Edit.field
  field :DestroyComment, field: CommentMutations::Destroy.field
  field :CreateComment, field: CommentMutations::Create.field

  field :DestroyPostVote, field: PostVoteMutations::Destroy.field
  field :CreatePostVote, field: PostVoteMutations::Create.field
end
