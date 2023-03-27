import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosLogIn } from 'react-icons/io'
import { BsYinYang } from 'react-icons/bs'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='p-3'>
      <div className='header bg-cyan-600 p-5 rounded flex justify-between items-center'>
        <BsYinYang className='text-4xl text-white' />
        <h2 className='cursor-pointer' onClick={() => navigate('/')}>
          <strong className='text-primary'>Flow State</strong>
          <strong className='text-secondary'> Swim</strong>
        </h2>

        {user && (
          <div className='flex gap-3 items-center'>
            <div className='flex gap-4 items-center'>
              <BsYinYang className='text-2xl ' />
              <h4
                className='uppercase cursor-pointer underline'
                onClick={() => {
                  if (user.role === 'admin') navigate('/admin')
                  else navigate('/profile')
                }}
              >
                {user.name}
              </h4>
            </div>

            <IoIosLogIn
              className='text-3xl cursor-pointer text-blue-600'
              onClick={() => {
                localStorage.removeItem('user')
                navigate('/login')
              }}
            >
              LogOut
            </IoIosLogIn>
          </div>
        )}
      </div>
      <div className='content my-1'>{children}</div>
    </div>
  )
}

export default ProtectedRoute
