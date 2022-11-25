Rails.application.routes.draw do
  devise_for :users
  authenticated :user do
  root 'components#index', as: :authenticated_root
end
  # Defines the root path route ("/")
  root 'pages#home'
end