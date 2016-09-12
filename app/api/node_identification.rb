GraphQL::Relay::GlobalNodeIdentification.instance_variable_set(
  :@instance,
  nil
)

NodeIdentification = GraphQL::Relay::GlobalNodeIdentification.define do
  object_from_id -> (id, ctx) do
    type_name, id = NodeIdentification.from_global_id(id)
    type_name.constantize.find(id)
  end
end
