require 'digest/md5'

class GraphQLReloader < Struct.new :app

  delegate :changed?, to: :class
  delegate :checksum, to: :class

  def call(env)
    RelaySchema.generate
    app.call(env)
  end
end
