import { doc, getDoc } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'

const GetInstructorById = async (id) => {
  try {
    const instructor = await getDoc(doc(firestoreDatabase, 'instructors', id))
    return {
      success: true,
      data: instructor.data()
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export default GetInstructorById
