Rails.application.routes.draw do
  devise_for :users

  root to: 'pages#show'

  scope '/graphql' do
    post "/", to: "graphql#create"
  end

end
