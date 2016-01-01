MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :EditComment, field: CommentMutations::Edit.field
  field :DestroyComment, field: CommentMutations::Destroy.field
  field :CreateComment, field: CommentMutations::Create.field
end
