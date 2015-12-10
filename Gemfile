ruby '2.2.3'
source 'https://rubygems.org'

# Setup Rails and API
gem 'rails', '4.2.5'
gem 'pg'

# Setup server
gem 'passenger'

# Asset compilation and NPM modules
gem 'browserify-rails', '1.5.0'
gem 'sass-rails'
gem 'uglifier'

# Setup react and dependencies
gem 'therubyracer', platforms: :ruby
gem 'react-rails'

# Setup Octokit and HTTP cache
gem 'sidekiq'
gem 'redis'

# Setup caching and Marshalling
gem 'readthis'
gem 'hiredis'
gem 'oj'

# Throttle Malacious requests
gem 'rack-attack'

# Graphql
gem 'graphql'
gem 'graphql-relay'

# User auth
gem 'devise'

#Speed up links
gem 'turbolinks', github: 'rails/turbolinks'

#Secure headers HTTPS headers
gem "secure_headers", :require => 'secure_headers'

group :production do
  gem 'rails_12factor'
end

group :development do
  gem 'spring'
  gem 'web-console'
  gem 'foreman'
  gem 'figaro'
end
