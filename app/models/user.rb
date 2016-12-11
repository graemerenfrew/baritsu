class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :plan   
  
  attr_accessor :stripe_card_token
  #if pro user passes validations (email, password etc),
  #then call Stripe to set up a subscription customer upon charging the customer card
  #Stripe responds with customer data, and we store customer.id as the cusomter token and save the user
  #Creatign a 'Customer' on stripe seems to create a subscription
  #We can probably do one off payments by just using Card
  def save_with_subscription
    #if the fields pass the devise validations
    if valid?
      #call stripe and create a customer
      customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)
      self.stripe_customer_token = customer.id
      save!
    end
  end  
end
