QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema. See available queries."

  # Used by Relay to lookup objects by UUID: /TO BE discussed
  field :node, field: NodeIdentification.field

  # Hack until relay has lookup for root fields
  field :root, ViewerType do
    description 'Root object to get viewer related collections'
    resolve -> (obj, args, ctx) { Viewer::STATIC }
  end

  # Current user hack // Check GraphQL controller
  field :current_user, UserType do
    description  "Returns current signed in user object"
    resolve -> (obj, args, ctx) {
      ctx[:current_user] ? ctx[:current_user] : nil
    }
  end

end
