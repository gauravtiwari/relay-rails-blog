# GraphQL Type Generator
# Arguments: optional array of model fields
# Returns a GraphQL type

module Graphqlable
  extend ActiveSupport::Concern

  module ClassMethods
    def to_graphql_type(fields=[])
      model = self
      model_fields = model.columns_hash

      GraphQL::ObjectType.define do
        name(model.name)
        description("A single #{model.name} type")
        interfaces [NodeIdentification.interface]
        global_id_field(:id)

        # Check if the fields are given or use default fields
        @exposed_fields = if fields.any?
          model_fields.select do |column|
            fields.include?(column.to_sym)
          end
        else
          model_fields
        end

        # Make the fields available for this model
        @exposed_fields.each do |column, type|
          field(
            column,
            convert_type(type),
            "#{column} field for the #{model.name} model"
          )
        end
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
