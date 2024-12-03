class WebNotification

def initialize(subscription, title, body)
  @subscription = subscription
  @title = title
  @body = body
  @vapid_keys = {
    public_key: Rails.application.credentials[Rails.env.to_sym][:webpush][:public_key],
    private_key: Rails.application.credentials[Rails.env.to_sym][:webpush][:private_key],
    subject: Rails.application.credentials[Rails.env.to_sym][:webpush][:subject]
  }
end

def send_notification
  Rails.logger.info "notification_payload ==> #{notification_payload}"
  notice = WebPush.payload_send(
    message: notification_payload,
    endpoint: @subscription.endpoint,
    p256dh: @subscription.p256dh_key,
    auth: @subscription.auth_key,
    vapid: @vapid_keys
  )
  Rails.logger.info "#{notice} ======> " 
  Rails.logger.info "Sending push notification to: #{@subscription.endpoint}"
rescue Webpush::InvalidSubscription => e
  Rails.logger.error "Invalid Subscription: #{e.message}"
  @subscription.destroy # Optional: Remove invalid subscriptions
end

private

def notification_payload
  {
    title: @title,
    body: @body,
    icon: '/icon.png'
  }.to_json
end
end
