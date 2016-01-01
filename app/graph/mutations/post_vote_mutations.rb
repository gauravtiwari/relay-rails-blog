module PostVoteMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreatePostVote"

    input_field :votable_id, !types.ID

    return_field :post, PostType

    resolve -> (inputs, ctx) {
      votable = NodeIdentification.object_from_id_proc.call(inputs[:votable_id], ctx)
      user = ctx[:current_user]
      votable.votes.create({
        user: user
      })

      { post: NodeIdentification.object_from_id_proc.call(inputs[:votable_id], ctx) }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyPostVote"

    input_field :votable_id, !types.ID

    return_field :post, PostType

    resolve -> (inputs, ctx) {
      votable = NodeIdentification.object_from_id_proc.call(inputs[:votable_id], ctx)
      user = ctx[:current_user]
      vote = user.votes.where({
        votable: votable
      }).first
      vote.destroy

      { post: NodeIdentification.object_from_id_proc.call(inputs[:votable_id], ctx) }
    }
  end
end

