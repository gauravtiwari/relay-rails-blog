class FindQuery < GraphQL::Batch::Query
  attr_reader :model, :id

  def initialize(model, id, &block)
    @model = model
    @id = id
    super(&block)
  end

  # super returns the class name
  def group_key
    "#{super}:#{model.name}"
  end

  def self.execute(queries)
    model = queries.first.model
    ids = queries.map(&:id)
    records_by_id = model.where(id: ids).index_by(&:id)
    queries.each do |query|
      query.complete(records_by_id[query.id])
    end
  end
end
