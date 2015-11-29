Rails.application.routes.draw do

  devise_for :users
  scope '/graphql' do
    post "/", to: "graphql#create"
  end

end
