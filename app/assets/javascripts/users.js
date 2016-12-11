/* global $ */
/* global Stripe */

//Document ready
$(document).on('turbolinks:load', function(){
    
    //Assign elements to variables for easier reference
    var theForm = $('#pro_form'); 
    var submitBtn = $('#form-signup-btn');
   
    //Set Stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    //When user clicks form submit, we prevent default submit behaviour
    submitBtn.click(function(event){
      event.preventDefault();
      submitBtn.val("Processing").prop('disabled', true);
      
      //collect cc fields
      var ccNum = $('#card_number').val(),
          cvcNum = $('#card_code').val(),
          expMonth = $('#card_month').val(),
          expYear = $('#card_year').val();
          
      //use Stripe JS library to check for card errors
      var error = false;
      
      //validate the card number
      if(!Stripe.card.validateCardNumber(ccNum)){
        error = true;
        alert('The credit card number appears to be invalid.')
      }
      
      //validate the cvc number
      if(!Stripe.card.validateCVC(cvcNum)){
        error = true;
        alert('The credit card cvc number appears to be invalid.')
      }
      
      //validate the exp date 
      if(!Stripe.card.validateExpiry(expMonth, expYear)){
        error = true;
        alert('The credit card expiry appears to be invalid.')
      }
      
      if (error) {
        //if there are card errors, don't send to stripe
        //Re-activate the submit button
        submitBtn.prop('disabled', false).val("Sign Up");
      }    
      else
      {
        //send card info to Stripe
        Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expMonth,
          exp_year: expYear
        }, stripeResponseHandler);
      }
      return false;
    });
    
    //Stripe returns card token
    function stripeResponseHandler(status, response){
      var token = response.id;
      //Handle that token response
      //Inject token as hidden field into form
      theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token));
          
      //Submit form to our app
      theForm.get(0).submit();
    }

 
});