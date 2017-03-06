$LOAD_PATH << File.expand_path('../lib', __dir__)
require File.expand_path('../boot', __FILE__)

require 'rails/all'
# require "rails/test_unit/railtie"
require 'graphql_reloader'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GraphqlBlog
  class Application < Rails::Application
    config.middleware.use GraphQLReloader
    config.autoload_paths << Rails.root.join('app/api')
    config.autoload_paths << Rails.root.join('app/api/fields')
    config.autoload_paths << Rails.root.join('app/api/mutations')
    config.autoload_paths << Rails.root.join('app/api/types')
    config.autoload_paths << Rails.root.join('app/api/resolvers')

    config.active_record.raise_in_transactional_callbacks = true
    ActiveSupport.halt_callback_chains_on_return_false = false

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.schema_format = :sql

    # Configure rails g to skip helper/assets files
    config.generators do |g|
      g.assets = false
      g.helper = false
      g.view_specs      false
      g.helper_specs    false
    end
  end
end
