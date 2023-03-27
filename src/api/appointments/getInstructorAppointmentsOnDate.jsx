import firestoreDatabase from '../../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'

const GetInstructorAppointmentOnDate = async (instructorId, date) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestoreDatabase, 'appointments'),
        where('instructorId', '==', instructorId),
        where('date', '==', date)
      )
    )
    const data = []
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export default GetInstructorAppointmentOnDate
