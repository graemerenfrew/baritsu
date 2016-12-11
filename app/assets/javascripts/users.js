/* global $ */
/* global Stripe */

//Document ready
$(document).on('turbolinks:load', function(){
    //Assign elements to variables for easier reference
    var theForm = $('#pro_form'); 
    var submitBtn = $('#form-submit-btn');
    
    //Set Stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    //When user clicks form submit, we prevent default submit behaviour
    submitBtn.click(function(event){
      event.preventDefault();
      
      //collect cc fields
      var ccNum = $('#card_number').val(),
          cvcNum = $('#card_code').val(),
          expMonth = $('#card_month').val(),
          expYear = $('#card_year').val();
          
      //send card info to Stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    });
    
    //Stripe returns card token
    //Handle that token response
    //Inject token as hidden field into form
    //Submit form to our app
});