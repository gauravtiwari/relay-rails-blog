MutationType = GraphQL::ObjectType.define do
  name 'Mutation Type'

  field :EditComment, field: CommentMutations::Edit.field
  field :DeleteComment, field: CommentMutations::Destroy.field
  field :CreateComment, field: CommentMutations::Create.field

  field :CreatePost, field: PostMutations::Create.field
  field :DestroyPost, field: PostMutations::Destroy.field
  field :EditPost, field: PostMutations::Edit.field

  field :CreateVote, field: VoteMutations::Create.field
  field :DestroyVote, field: VoteMutations::Destroy.field
end
