class CreateWebSubscriptions < ActiveRecord::Migration[8.0]
  def change
    create_table :web_subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :endpoint
      t.string :auth_key
      t.string :p256dh_key
      t.string :user_agent

      t.timestamps
    end
  end
end
