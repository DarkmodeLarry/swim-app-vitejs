import { collection, getDocs, query, where } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'

const CheckIfInstructorAccountIsApplied = async (id) => {
  try {
    const instructors = await getDocs(
      query(collection(firestoreDatabase, 'instructors'), where('userId', '==', id))
    )
    if (instructors.size > 0) {
      return {
        success: true,
        message: 'Instructor account is already applied',
        data: instructors.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })[0]
      }
    }
    return {
      success: false,
      message: 'Instructor account not applied,'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export default CheckIfInstructorAccountIsApplied
