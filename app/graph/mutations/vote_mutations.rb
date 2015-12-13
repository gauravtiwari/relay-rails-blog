module VoteMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateVote"

    input_field :votable_id, !types.ID
    input_field :votable_type, !types.String
    input_field :user_id, !types.ID

    return_field :votable, PostType.edge_type
    return_field :vote, VoteType

    resolve -> (inputs, ctx) {
      votable = NodeIdentification.object_from_id_proc.call(inputs[:votable_id])
      user = NodeIdentification.object_from_id_proc.call(inputs[:user_id])

      vote = user.votes.create(votable: votable, user: user)

      connection = GraphQL::Relay::RelationConnection.new(votable, {})
      edge = GraphQL::Relay::Edge.new(vote, connection)

      { vote: vote, votable: edge }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyVote"

    input_field :votable_id, !types.ID
    input_field :votable_type, !types.String
    input_field :user_id, !types.ID

    return_field :deletedId, !types.ID
    return_field :votable, PostType

    resolve -> (inputs, ctx) {
      vote = NodeIdentification.object_from_id_proc.call(inputs[:id])
      votable = NodeIdentification.object_from_id_proc.call(inputs[:votable_id])

      vote.destroy

      { votable: votable, deletedId: inputs[:id] }
    }
  end

end
