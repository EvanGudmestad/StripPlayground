import { loadStripe } from '@stripe/stripe-js';

// Import Stripe.js
const stripePromise = loadStripe("pk_test_51P4k0fEbZVKNzmgr15OFwFXoXq6YskAjewBhXby3m1C31LihCRN8ISs3wConDaLRtB0WDt1uvJFRYJ3QWi857qAu004PEBSu8c");

function Checkout() {
  // Event handler for the checkout button click
  const handleCheckout = async () => {
    try {
      // Make a POST request to the server to create a checkout session
      const response = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const { id } = await response.json();

      // Load Stripe and redirect to checkout
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Checkout;
