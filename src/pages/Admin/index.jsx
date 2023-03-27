import { message, Tabs } from 'antd'
import UsersList from './UsersList'
import InstructorsList from './InstructorsList'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ShowLoader } from '../../redux/loaderSlice'
import GetUserById from '../../api/users/getUserById'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkIsAdmin = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetUserById(user.id)
      dispatch(ShowLoader(false))
      if (response.success && response.data.role === 'admin') {
        setIsAdmin(true)
      } else {
        throw new Error('You are not an admin')
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    checkIsAdmin()
  }, [])

  return (
    isAdmin && (
      <div className='bg-black/60 p-2'>
        <Tabs>
          <Tabs.TabPane tab='Swimmers' key='1'>
            <UsersList />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Instructors' key='2'>
            <InstructorsList />
          </Tabs.TabPane>

          <Tabs.TabPane tab='Swimmer Stats' key='3'>
            Swimmer Stats
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  )
}

export default Admin
