import { Col, message, Row } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GetAllInstructors from '../../api/instructors/getAllInstructors'
import { ShowLoader } from '../../redux/loaderSlice'

function Home() {
  const [instructors, setInstructors] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetAllInstructors()
      if (response.success) {
        setInstructors(response.data)
      } else {
        message.error(response.message)
      }

      dispatch(ShowLoader(false))
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    user && (
      <div className='w-full'>
        <div className='flex w-full justify-between'>
          <div>
            <input placeholder='Search Instructors' className='w-[400px] border-2 ' />
          </div>
          {user?.role !== 'instructor' && (
            <button
              className='rounded border-2 p-3 border-black m-2'
              onClick={() => navigate('/instructorform')}
            >
              Apply as Instructor
            </button>
          )}
        </div>

        <Row gutter={[16, 16]} className='my-2 w-full sm:w-[400px] flex flex-col justify-center'>
          {instructors.map((instructor) => {
            return (
              <Col span={24} className='m-1 '>
                <div
                  onClick={() => navigate(`/bookappointment/${instructor.id}`)}
                  className='bg-black/20 p-2 flex flex-col gap-1 drop-shadow shadow-gray-500 border cursor-pointer'
                >
                  <div className='flex justify-between py-2 w-full '>
                    <h3 className='uppercase font-bold text-xl'>
                      {instructor.firstName} {instructor.lastName}
                    </h3>
                  </div>

                  <hr />
                  <div className='flex justify-between w-full'>
                    <h3>
                      <b>Speciality : </b>
                    </h3>
                    <h3>{instructor.speciality}</h3>
                  </div>
                  <div className='flex justify-between w-full'>
                    <h3>
                      <b>Experience : </b>
                    </h3>
                    <h3>{instructor.experience} Years</h3>
                  </div>
                  <div className='flex justify-between w-full'>
                    <h3>
                      <b>Email : </b>
                    </h3>
                    <h3>{instructor.email}</h3>
                  </div>
                  <div className='flex justify-between w-full'>
                    <h3>
                      <b>Phone Number : </b>
                    </h3>
                    <h3>{instructor.phone}</h3>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  )
}

export default Home
