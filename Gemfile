ruby '2.3.0'
source 'https://rubygems.org'

# Setup Rails and API
gem 'rails', '4.2.5'
gem 'pg'

# Asset compilation and NPM modules
gem 'sass-rails'
gem 'uglifier'

# Setup react and dependencies
gem 'therubyracer', platforms: :ruby

# Graphql
gem 'graphql', github: 'rmosolgo/graphql-ruby'
gem 'graphql-relay', github: 'rmosolgo/graphql-relay-ruby'
gem 'graphiql-rails'

# Javascript routes
gem 'js-routes'

# Authorization
gem 'pundit'

# User auth
gem 'devise'

# Bootstrap
gem 'bootstrap-sass', '~> 3.3.6'

#Speed up links
gem 'turbolinks', '~> 5.x'

# Slug
gem 'stringex'

# Time
gem 'local_time'

# React integration
gem 'react_on_rails', github: "gauravtiwari/react_on_rails"

# Caching
gem 'rack-cache'
gem 'kgio'
gem 'dalli'

# Fake data
gem 'faker'

group :production do
  gem 'rails_12factor'
  gem 'puma'
end

group :development do
  gem 'spring'
  gem 'web-console'
  gem 'foreman'
  gem 'figaro'
end
