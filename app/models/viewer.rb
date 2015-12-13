class Viewer < Struct.new :id
  # HACK:// For relay root queries
  STATIC = new(id: 'root').freeze

  def self.find(_)
    STATIC
  end
end
