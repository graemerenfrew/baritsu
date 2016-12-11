class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  # Whielist the following form fields so we can grab and process them
  # We list the fields, so a hacker cannot manipulate/inject forms into our website with other fields
  # if coming from a device controller
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  protected 
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up){ |u| u.permit(:stripe_card_token, :email, :password, :password_confirmation) }
    end
end
