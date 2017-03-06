# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Add client/assets/ folders to asset pipeline's search path.
# If you do not want to move existing images and fonts from your Rails app
# you could also consider creating symlinks there that point to the original
# rails directories. In that case, you would not add these paths here.
# Add client/assets/ folders to asset pipeline's search path.
# If you do not want to move existing images and fonts from your Rails app
# you could also consider creating symlinks there that point to the original
# rails directories. In that case, you would not add these paths here.
Rails.application.config.assets.paths << Rails.root.join('client', 'assets', 'stylesheets')
Rails.application.config.assets.paths << Rails.root.join('client', 'assets', 'images')
Rails.application.config.assets.paths << Rails.root.join('client', 'assets', 'fonts')

# Add folder with webpack generated assets to assets.paths
Rails.application.config.assets.paths << Rails.root.join('app', 'assets', 'webpack')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w(
  server-bundle.js
)

if ENV['REACT_ON_RAILS_ENV'] != 'HOT'
  Rails.application.config.assets.precompile += %w(
    application_static.js.erb
    application_static.css.erb
  )
else
  Rails.application.config.assets.precompile += %w(
    application_non_webpack.js.erb
    application_non_webpack.css.erb
  )
end
