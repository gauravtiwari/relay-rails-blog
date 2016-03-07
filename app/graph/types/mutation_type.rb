MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :EditComment, field: CommentMutations::Edit.field
  field :DestroyComment, field: CommentMutations::Destroy.field
  field :CreateComment, field: CommentMutations::Create.field

  field :DestroyVote, field: VoteMutations::Destroy.field
  field :CreateVote, field: VoteMutations::Create.field
end
