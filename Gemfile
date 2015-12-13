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
#gem 'react-rails'

# Setup Octokit and HTTP cache
gem 'sidekiq'
gem 'redis'

# Graphql
gem 'graphql'
gem 'graphql-relay', '0.5.0'

# Javascript routes
gem 'js-routes'

# Jquery turblinks
gem 'jquery-turbolinks'

# Authorization
gem 'pundit'

# User auth
gem 'devise'

# Bootstrap
gem 'bootstrap-sass', '~> 3.3.6'

# Pagination

gem 'will_paginate'

#Speed up links
gem 'turbolinks', github: 'rails/turbolinks'

# Slug
gem 'stringex'

# Time
gem 'local_time'

# React
gem 'react-rails', '~> 1.5.0'

#Secure headers HTTPS headers
gem "secure_headers", :require => 'secure_headers'

group :production do
  gem 'rails_12factor'
end

group :development do
  gem 'spring'
  gem 'faker'
  gem 'web-console'
  gem 'foreman'
  gem 'figaro'
end
