import firestoreDatabase from '../../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'

const GetInstructorAppointments = async (instructorId) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestoreDatabase, 'appointments'),
        where('instructorId', '==', instructorId)
      )
    )
    const data = []
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id
      })
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export default GetInstructorAppointments
