Rails.application.routes.draw do
  root "home#index"
  resources :games, only: %i[index create show update] do
    member do 
      get :find_game
    end
  end
end
