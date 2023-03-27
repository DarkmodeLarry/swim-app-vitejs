import { doc, getDoc } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'

const GetUserById = async (id) => {
  try {
    const user = await getDoc(doc(firestoreDatabase, 'users', id))
    return {
      success: true,
      data: {
        ...user.data(),
        id: user.id
      }
    }
  } catch (error) {
    return error
  }
}

export default GetUserById
