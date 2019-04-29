var stripe = require("stripe")("sk_test_5YsSBhEjLKeDs389WK6CKsVs00WlDseaNZ");

(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'Premium upgrade',
      description: 'upgrade from standard to premium',
      // images: ['https://example.com/t-shirt.png'],
      amount: 1500,
      currency: 'usd',
      quantity: 1,
    }],
    success_url: '/',
    cancel_url: '/',
  });
})();