// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB_HN0qmIQ2ZcnndbjnYwcqwFmqqWAAHmk',
  authDomain: 'swim-coach-26472.firebaseapp.com',
  databaseURL: 'https://swim-coach-26472-default-rtdb.firebaseio.com',
  projectId: 'swim-coach-26472',
  storageBucket: 'swim-coach-26472.appspot.com',
  messagingSenderId: '511968615947',
  appId: '1:511968615947:web:803d55afab3b8988cab10e',
  measurementId: 'G-5WX6WWZNFQ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestoreDatabase = getFirestore(app)

export default firestoreDatabase
