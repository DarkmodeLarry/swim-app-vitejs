import { collection, getDocs, query, where } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'

const GetUserAppointments = async (userId) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestoreDatabase, 'appointments'), where('userId', '==', userId))
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

export default GetUserAppointments
