$: << File.expand_path('../lib', __dir__)
require File.expand_path('../boot', __FILE__)

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"
require 'graphql_reloader'
require 'relay_component_mount'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GraphqlBlog
  class Application < Rails::Application
    config.middleware.use GraphQLReloader
    config.autoload_paths << Rails.root.join('app/graph')
    config.autoload_paths << Rails.root.join('app/lib')
    config.autoload_paths << Rails.root.join('app/graph/mutations')
    config.autoload_paths << Rails.root.join('app/graph/types')
    config.active_record.raise_in_transactional_callbacks = true

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.schema_format = :sql

    # Configure react rendering
    config.react.addons = true
    config.react.server_renderer_pool_size  ||= 5
    config.react.server_renderer_timeout    ||= 20
    config.react.server_renderer = React::ServerRendering::SprocketsRenderer
    config.react.server_renderer_options = {
      files: ["react.js", "components.js"],
      replay_console: true,
    }

    config.react.view_helper_implementation = RelayComponentMount # Defaults to RelayComponentMount

    # Configure rails g to skip helper/assets files
    config.generators do |g|
      g.assets = false
      g.helper = false
      g.view_specs      false
      g.helper_specs    false
    end

    # Setup browserify with Babel
    config.browserify_rails.commandline_options = "-t babelify --extension=\"es6.js\""
    config.browserify_rails.source_map_environments << "development"
    config.browserify_rails.evaluate_node_modules = true

  end

end
