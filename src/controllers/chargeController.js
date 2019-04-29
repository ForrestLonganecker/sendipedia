var stripe = Stripe(process.env.stripeTestKey);
var elements = stripe.elements();

var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d",
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});


function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}


// const stripe = Stripe(process.env.stripeSecretKey);
// const elements = stripe.elements();

// const style = {
//   base: {
//     color: '#32325d',
//     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//     fontSmoothing: 'antialiased',
//     fontSize: '16px',
//     '::placeholder': {
//       color: '#aab7c4'
//     }
//   },
//   invalid: {
//     color: '#fa755a',
//     iconColor: '#fa755a'
//   }
// };

// const card = elements.create('card', {style});

// card.mount('#card-element');

// card.addEventListener('change', function(event) {
//   var displayError = document.getElementById('card-errors');
//   if(event.error){
//     displayError.textContent = event.error.message;
//   } else {
//     displayError.textContent = '';
//   }
// });

// var form = document.getElementById('payment-form');
// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   stripe.createToken(card).then(function(result) {
//     if(result.error){
//       var errorElement = document.getElementById('card-errors');
//       errorElement.textContent = result.error.message;
//     } else {
//       stripeTokenHandler(result.token)
//     }
//   })
// });

// const stripeTokenHandler = (token) => {

//   const form = document.getElementById('payment-form');
//   const hiddenInput = document.createElement('input');

//   hiddenInput.setAttribute('type', 'hidden');
//   hiddenInput.setAttribute('name', 'stripeToken');
//   hiddenInput.setAttribute('value', token.id);

//   form.appendChild(hiddenInput);
//   form.submit();
// };