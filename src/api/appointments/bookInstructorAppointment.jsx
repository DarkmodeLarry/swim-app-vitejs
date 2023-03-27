import firestoreDatabase from '../../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const BookInstructorAppointment = async (payload) => {
  try {
    await addDoc(collection(firestoreDatabase, 'appointments'), payload)
    return { success: true, message: 'Appointment booked successfully' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export default BookInstructorAppointment
