module Graphqlable
  extend ActiveSupport::Concern

  module ClassMethods
    # @example usage
    # => UserType = User.to_graphql_type
    # => UserType = User.to_graphql_type([:name, :email], true)
    # => UserType.inspect
    # => "User"
    #
    # @optional param: array of model fields [:name, :email]
    # @optional param: Relay support
    # @return A {ObjectType} for a model

    def to_graphql_type(fields = [], relay = false)
      begin
        raise ArgumentError unless fields && fields.is_a?(Array)

        model = self
        model_fields = model.columns_hash.except('id') if relay

        GraphQL::ObjectType.define do
          name(model.name)
          description("A single #{model.name} type")

          if relay
            interfaces [GraphQL::Relay::Node.interface]
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

# @example usage
# =>  graphql_type = convert_type(:integer)
# => types.Int
#
# @param database_type
# @return A valid graphql type

def convert_type(database_type)
  case database_type.type
  when :integer
    types.Int
  when :number
    types.Int
  when :boolean
    types.Boolean
  else
    types.String
  end
end
