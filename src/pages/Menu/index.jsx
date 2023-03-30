import { BsYinYang } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore'
import firestoreDatabase from '../../../firebaseConfig'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Menu() {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState('')

  const dispatch = useDispatch()

  const getServicesMenu = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(firestoreDatabase, 'services'), where('active', '==', true))
      )
      const data = []
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id
        })
      })
      console.log(data)
      setServices(data)
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  useEffect(() => {
    getServicesMenu()
  }, [])

  return (
    <div>
      <div className=''>
        <h1>How can we help you today?</h1>
        <ul className='flex flex-col'>
          <div className='flex items-center gap-2'>
            <BsYinYang className='flex items-center' />
            <li className='flex items-center'>Membership Plans</li>
          </div>
          <div className='flex items-center gap-2'>
            <BsYinYang className='flex items-center' />
            <li className='flex items-center'>Professional Certifications</li>
          </div>
          <div className='flex items-center gap-2'>
            <BsYinYang className='flex items-center' />
            <li className='flex items-center'>Private Lessons</li>
          </div>
        </ul>

        <div className='flex flex-col'>
          <div className='flex w-full items-center'>
            {services.map((service) => (
              <div
                className={`planBox ${
                  selectedService?.id === service.id ? 'opacity-100' : 'opacity-60'
                }`}
                key={service.id}
                onClick={() => setSelectedService(service)}
              >
                {service.name}
              </div>
            ))}
          </div>

          <table>
            <tbody className='divide-y divide-gray-400'>
              <tr className='tableRow'>Price</tr>
              <td className='tableDataFeature'>AED</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Menu
