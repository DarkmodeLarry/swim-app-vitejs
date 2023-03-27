import { collection, getDocs } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'

const GetAllUsers = async () => {
  try {
    const users = await getDocs(collection(firestoreDatabase, 'users'))
    return {
      success: true,
      data: users.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })
    }
  } catch (error) {
    return error
  }
}

export default GetAllUsers
