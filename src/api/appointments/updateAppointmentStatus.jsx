import { doc, updateDoc } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'

const UpdateAppointmentStatus = async (id, status) => {
  try {
    await updateDoc(doc(firestoreDatabase, 'appointments', id), {
      status
    })
    return { success: true, message: 'Appointment status updated' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export default UpdateAppointmentStatus
