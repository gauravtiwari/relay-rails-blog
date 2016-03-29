MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :EditComment, field: CommentMutations::Edit.field
  field :DestroyComment, field: CommentMutations::Destroy.field
  field :CreateComment, field: CommentMutations::Create.field

  field :DestroyVote, field: VoteMutations::Destroy.field
  field :CreateVote, field: VoteMutations::Create.field

  field :DestroyPost, field: PostMutations::Destroy.field
  field :CreatePost, field: PostMutations::Create.field
  field :EditPost, field: PostMutations::Edit.field
end
