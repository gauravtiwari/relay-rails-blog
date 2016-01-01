Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users, skip: [:registrations],  controllers: {registrations: 'users/registrations'}
  as :user do
    get   '/signup' => 'users/registrations#new',    as: 'new_user_registration'
    post  '/signup' => 'users/registrations#create', as: 'user_registration'
  end
  resources :posts
end
