import { collection, getDocs } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'

const GetAllInstructors = async () => {
  try {
    const instructors = await getDocs(collection(firestoreDatabase, 'instructors'))
    return {
      success: true,
      data: instructors.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export default GetAllInstructors
