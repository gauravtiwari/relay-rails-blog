module Graphqlable
  extend ActiveSupport::Concern

  module ClassMethods

    # Make a {ObjectType} which wraps the model fields
    #
    # @example generating a type

    # Without given fields - all model fields are added
    # =>  UserType = User.to_graphql_type
    #
    # With given fields - only specific fields are added
    # => UserType = User.to_graphql_type([:name, :email])
    # => UserType.inspect
    # => "User"
    #
    # @optional param: array of model fields [:name, :email]
    # @optional param: Boolean to support relay
    # @return A {ObjectType} for a model

    def to_graphql_type(fields=[], relay=false)
      begin
        raise ArgumentError unless fields and fields.is_a?(Array)

        model = self
        model_fields = model.columns_hash

        GraphQL::ObjectType.define do
          name(model.name)
          description("A single #{model.name} type")

          if relay
            interfaces [NodeIdentification.interface]
            global_id_field(:id)
          end

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
    rescue StandardError
      puts 'The provided param is not an array'
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
