import firestoreDatabase from '../../../firebaseConfig'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import CryptoJS from 'crypto-js'

const CreateUser = async (payload) => {
  try {
    // check if user already exists using email
    const qry = query(collection(firestoreDatabase, 'users'), where('email', '==', payload.email))
    const querySnapshot = await getDocs(qry)
    if (querySnapshot.size > 0) {
      throw new Error('User already exists')
    }

    // encrypt password with hash password
    const hashedPassword = CryptoJS.AES.encrypt(payload.password, 'swim-app').toString()
    payload.password = hashedPassword
    // create user

    const docRef = collection(firestoreDatabase, 'users')
    await addDoc(docRef, payload)
    return {
      success: true,
      message: 'User created successfully'
    }
  } catch (error) {
    return error
  }
}

export default CreateUser
