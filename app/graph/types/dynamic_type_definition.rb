class DynamicTypeDefinition
  attr_reader :model

  def initialize(model)
    @model = model
  end

  def to_graphql_type(exposed_fields=[], exposed_methods=[])
    model_class = model
    model_name = model.name
    type = GraphQL::ObjectType.define do
      name(model_name)
      description("Generated programmatically from model: #{model_name}")
      interfaces [NodeIdentification.interface]
      global_id_field(:id)

      # Make methods available for a model
      exposed_methods.each do |method|
        field(
          method[:name],
          convert_type(method[:type]),
          "#{method[:name].to_s} for the #{model_name} model"
        ) if exposed_methods.length > 0
      end

      # Make the fields available for model
      model_class.columns.each do |column|
        field(
          column.name,
          convert_type(column.type),
          "#{column.name} for the #{model_name} model"
        ) if exposed_fields.length > 0 and exposed_fields.include?(column.name.to_sym)
      end
    end
  end

end

def convert_type(database_type)
  case database_type
  when :integer
    types.ID
  when :string
    types.String
  when :inet
    types.String
  when :datetime
    types.String
  when :id
    types.ID
  else
    types
  end
end
