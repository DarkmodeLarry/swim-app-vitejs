import { useDispatch } from 'react-redux'
import { ShowLoader } from '../../redux/loaderSlice'
import { Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import CreateUser from '../../api/users/createUser'
import { useEffect } from 'react'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoader(true))
      const response = await CreateUser({
        ...values,
        role: 'user'
      })
      dispatch(ShowLoader(false))
      if (response.success) {
        message.success(response.message)
        navigate('/login')
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) navigate('/')
  }, [])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[400px] border-2 border-black p-2'>
        <h1 className='text-center'>Sign Up</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item name='name' label='Name'>
            <input type='text' />
          </Form.Item>

          <Form.Item name='email' label='Email'>
            <input type='email' />
          </Form.Item>

          <Form.Item name='password' label='Password'>
            <input type='password' />
          </Form.Item>

          <button type='submit' className='contained-btn bg-black text-white p-2 rounded-xl w-full'>
            REGISTER
          </button>
        </Form>
        <div className='cursor-pointer pt-8'>
          <Link to='/login' className=' '>
            Already signed up? <strong>Log in</strong>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
