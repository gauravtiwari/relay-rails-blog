class BaseType
  def initialize(model)
    @model = model
  end

  def to_graphql_type(exposed_fields=[])
    database_model = @model
    GraphQL::ObjectType.define do
      name(database_model.name)
      description("A single #{database_model.name} type")
      interfaces [NodeIdentification.interface]
      global_id_field(:id)

      # Make the exposed fields available for this model
      database_model.columns.each do |column|
        field(
          column.name,
          convert_type(column.type),
          "#{column.name} field for the #{database_model.name} model"
        ) if exposed_fields.include?(column.name.to_sym)
      end
    end
  end
end

def convert_type(database_type)
  case database_type
  when :integer
    types.Int
  when :boolean
    types.Boolean
  else
    types.String
  end
end
