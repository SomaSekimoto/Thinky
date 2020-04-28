Rails.application.routes.draw do
  devise_for :users, only: []

  namespace :v1, defaults: { format: :json } do
    resource :login, only: [:create], controller: :sessions
    resource :users, only: [:create]
    get :logged_in, to: "sessions#logged_in"
  end
  
  get 'whies/index'

  resources :whies do
    member do
      get 'count'
    end
  end
  # get 'whies/find'

  post 'whies/post'
  patch 'whies/update'

  get 'answers/index_pv'
  get 'answers/index_pb'
  post 'answers/post_pv'
  post 'answers/post_pb'
end
