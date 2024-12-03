class Blog < ApplicationRecord
  after_create :sent_notification

  def sent_notification
    @subscription = WebSubscription.last
    @title = "Hello!" 
    @body = "This is a test push notification."
    WebNotification.new(@subscription, @title, @body).send_notification
  end 

end
