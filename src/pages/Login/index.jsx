import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import LoginUser from '../../api/users/loginUser'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ShowLoader } from '../../redux/loaderSlice'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoader(true))
      const response = await LoginUser(values)
      dispatch(ShowLoader(false))
      if (response.success) {
        message.success(response.message)
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...response.data,
            password: ''
          })
        )
        navigate('/')
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
    <div className='flex justify-center items-center h-screen bg-secondary'>
      <div className='w-[400px] p-2 border-2 border-black rounded-lg'>
        <Form layout='vertical' onFinish={onFinish}>
          <h1 className='text-center uppercase'>Sign In</h1>
          <Form.Item name='email' label='Email'>
            <Input type='email' />
          </Form.Item>

          <Form.Item name='password' label='Password'>
            <Input type='password' />
          </Form.Item>

          <button
            type='submit'
            className='w-full bg-black text-white py-2 rounded-xl contained-btn'
          >
            Log in
          </button>
        </Form>
        <div className='cursor-pointer pt-8'>
          <Link to='/register' className=' '>
            Not signed up? <strong>Sign Up</strong>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
