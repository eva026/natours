/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51H0NlNGsIgwQpNhGpq0rxrzG1c3CyGnVt5NqsDEPuG9iHSS0FWex7MYyWaS9vOZkgHdCJBs0YhvE5HdK65RWyTwS003rmJ5PBS'
);
export const bookTour = async (tourId) => {
  try {
    // 1) Get session from API
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);
    // 2) Create checkout form and charge credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
