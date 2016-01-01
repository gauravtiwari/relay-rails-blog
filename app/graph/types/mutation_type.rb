MutationType = GraphQL::ObjectType.define do
  name 'Mutation Type'

  field :EditComment, field: Comment::CreateCommentMutation::Edit.field
  field :DestroyComment, field: Comment::CreateCommentMutation::Destroy.field
  field :CreateComment, field: Comment::CreateCommentMutation::Create.field
end
