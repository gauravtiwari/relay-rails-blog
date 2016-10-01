RelaySchema = GraphQL::Schema.define do
  query QueryType
  mutation MutationType
  max_depth 7

  object_from_id -> (id, ctx) { decode_object(id) }
  id_from_object -> (obj, type, ctx) { encode_object(obj, type) }
  rescue_from ActiveRecord::RecordInvalid, &:message
  rescue_from CanCan::AccessDenied, &:message
  rescue_from ActiveRecord::Rollback, &:message
  rescue_from StandardError, &:message
  rescue_from ActiveRecord::RecordNotUnique, &:message
  rescue_from ActiveRecord::RecordNotFound, &:message
  resolve_type -> (object, _ctx) { RelaySchema.types[type_name(object)] }
end

def type_name(object)
  object.class.name
end

def encode_object(object, type)
  GraphQL::Schema::UniqueWithinType.encode(type.name, object.id)
end

def decode_object(id)
  type_name, object_id = GraphQL::Schema::UniqueWithinType.decode(id)
  Object.const_get(type_name).find(object_id)
end

# Responsible for dumping Schema.json to app/assets/javascripts/relay/
module RelaySchemaHelpers
  # Schema.json location
  SCHEMA_DIR  = Rails.root.join('app/assets/javascripts/relay/')
  SCHEMA_PATH = File.join(SCHEMA_DIR, 'schema.json')

  def execute_introspection_query
    # Cache the query result
    Rails.cache.fetch checksum do
      RelaySchema.execute GraphQL::Introspection::INTROSPECTION_QUERY
    end
  end

  def checksum
    files   = Dir['app/api/**/*.rb'].reject { |f| File.directory?(f) }
    content = files.map { |f| File.read(f) }.join
    Digest::SHA256.hexdigest(content).to_s
  end

  def dump_schema
    # Generate the schema on start/reload
    FileUtils.mkdir_p SCHEMA_DIR
    result = JSON.pretty_generate(RelaySchema.execute_introspection_query)
    unless File.exists?(SCHEMA_PATH) && File.read(SCHEMA_PATH) == result
      File.write(SCHEMA_PATH, result)
    end
  end
end

RelaySchema.extend RelaySchemaHelpers
