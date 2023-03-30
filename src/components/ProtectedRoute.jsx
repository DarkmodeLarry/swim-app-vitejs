import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPowerOff } from 'react-icons/fa'
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
      <div className='bg-[var(--primary)] text-[var(--whitish)] p-5 rounded flex justify-between items-center'>
        <div
          className='flex flex-col cursor-pointer items-center font-extrabold italic text-2xl'
          onClick={() => navigate('/')}
        >
          <h1 className=''>Flow State</h1>
          <span className=''> Swim</span>
        </div>

        {user && (
          <div className='flex gap-3 items-center'>
            <div
              className='flex gap-4 items-center relative px-10 cursor-pointer'
              onClick={() => {
                if (user.role === 'admin') {
                  navigate('/admin')
                } else navigate('/profile')
              }}
            >
              <BsYinYang className='text-7xl fixed opacity-10' />
              <h4 className='uppercase text-lg font-semibold italic cursor-pointer tracking-wider'>
                {user.name}
              </h4>
            </div>

            <FaPowerOff
              className='text-2xl sm:text-4xl cursor-pointer text-cyan-600'
              onClick={() => {
                localStorage.removeItem('user')
                navigate('/login')
              }}
            />
          </div>
        )}
      </div>
      <main className='content my-1'>{children}</main>
    </div>
  )
}

export default ProtectedRoute
