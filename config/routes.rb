Rails.application.routes.draw do
  devise_for :users

  root to: 'pages#home'

  scope '/graphql' do
    post "/", to: "graphql#create"
  end

end
