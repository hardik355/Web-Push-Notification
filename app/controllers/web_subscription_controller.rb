class WebSubscriptionController < ApplicationController

	def create
		p 11111111111111111111111111111
		p params[:endpoint]
		p params[:keys]
		p 22222222222222222
    return unless current_user.present?
		@subscrption = WebSubscription.create!(
				user: current_user, 
				endpoint: params[:endpoint], 
				auth_key: params[:keys][:auth], 
				p256dh_key: params[:keys][:p256dh]) do |sub|
      sub.user_agent = request.user_agent
    end
	end 
end
