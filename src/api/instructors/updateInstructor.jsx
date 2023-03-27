import { doc, setDoc } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'

const UpdateInstructor = async (payload) => {
  try {
    await setDoc(doc(firestoreDatabase, 'instructors', payload.id), payload)
    return {
      success: true,
      message: 'Instructor updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export default UpdateInstructor
