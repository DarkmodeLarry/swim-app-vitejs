import { doc, setDoc, updateDoc } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'

const AddInstructor = async (payload) => {
  try {
    await setDoc(doc(firestoreDatabase, 'instructors', payload.userId), payload)

    // update user role
    await updateDoc(doc(firestoreDatabase, 'users', payload.userId), {
      role: 'instructor'
    })
    return {
      success: true,
      message: 'Instructor added successfully, please wait for approval'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export default AddInstructor
