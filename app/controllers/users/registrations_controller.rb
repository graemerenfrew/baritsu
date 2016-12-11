class Users::RegistrationsController < Devise::RegistrationsController
  
  #extend the default devise gem behaviour so that users signing up with
  #pro account (plan_id 2) get a subscription created on stripe
  #Otherwise devise signs up with standard sign-up process
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end