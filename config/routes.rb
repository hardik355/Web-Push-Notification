Rails.application.routes.draw do
  resources :blogs
  devise_for :users
  root "home#index"
  resources :notifications, only: [:create]
  resources :web_subscription, only: [:create]
end
