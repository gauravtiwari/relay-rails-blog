QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root of this schema. See available queries.'

  # Used by Relay to lookup objects by UUID: /TO BE discussed
  field :node, GraphQL::Relay::Node.field

  # Hack until relay has lookup for root fields
  field :root, ViewerType do
    description 'Root object to get viewer related collections'
    resolve ->(_obj, _args, _ctx) { Viewer::STATIC }
  end
end
