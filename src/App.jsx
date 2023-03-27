import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Spinner from './components/Spinner'
import Profile from './pages/Profile'
import InstructorForm from './pages/InstructorForm'
import Admin from './pages/Admin'
import BookAppointment from './pages/BookAppointment'
import UpdateProfile from './pages/UpdateProfile'

function App() {
  const { loading } = useSelector((state) => state.loader)

  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/bookappointment/:id'
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/instructorform'
            element={
              <ProtectedRoute>
                <InstructorForm />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path='/updateprofile' element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
