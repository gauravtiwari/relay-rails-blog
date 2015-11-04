require 'digest/md5'

class GraphQLReloader < Struct.new :app

  delegate :changed?, to: :class
  delegate :checksum, to: :class

  def call(env)
    path = Rails.root.join('app/assets/javascripts/relay/schema.json')
    result = JSON.pretty_generate(RelaySchema.explain)
    File.write(path, result) unless File.exists?(path) && File.read(path) == result
    app.call(env)
  end
end
