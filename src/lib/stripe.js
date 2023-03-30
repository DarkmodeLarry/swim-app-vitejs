import { createCheckoutSession, getStripePayments } from '@stripe/firestore-stripe-payments'
import { getFunctions, httpsCallable } from '@firebase/functions'
import firestoreDatabase from '../../firebaseConfig'

const payments = getStripePayments(firestoreDatabase, {
  servicesCollection: 'services',
  usersCollection: 'users'
})

const loadCheckout = async (priceId) => {
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message))
}

export { loadCheckout }
export default payments
