import { message, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import GetInstructorAppointments from '../../api/appointments/getInstructorAppointments'
import GetUserAppointments from '../../api/appointments/getUserAppointments'
import UpdateAppointmentStatus from '../../api/appointments/updateAppointmentStatus'
import { ShowLoader } from '../../redux/loaderSlice'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const dispatch = useDispatch()

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role === 'instructor') {
      const response = await GetInstructorAppointments(user.id)
      if (response.success) {
        setAppointments(response.data)
      }
    } else {
      const response = await GetUserAppointments(user.id)
      if (response.success) {
        setAppointments(response.data)
      }
    }
  }

  const onUpdate = async (id, status) => {
    try {
      dispatch(ShowLoader(true))
      const response = await UpdateAppointmentStatus(id, status)
      if (response.success) {
        message.error(response.message)
        getData()
      } else {
        message.error(response.message)
      }
      dispatch(ShowLoader(false))
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Time',
      dataIndex: 'slot'
    },
    {
      title: 'Instructor',
      dataIndex: 'instructorName'
    },
    {
      title: 'Swimmer',
      dataIndex: 'userName'
    },
    {
      title: 'Booked At',
      dataIndex: 'bookedOn'
    },
    {
      title: 'Requests',
      dataIndex: 'problem'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (record.status === 'pending' && user.role === 'instructor') {
          return (
            <div className='flex gap-1'>
              <span
                className='underline cursor-pointer'
                onClick={() => onUpdate(record.id, 'cancelled')}
              >
                Cancel
              </span>
              <span
                className='underline cursor-pointer'
                onClick={() => onUpdate(record.id, 'approved')}
              >
                Approved
              </span>
            </div>
          )
        }
      }
    }
  ]

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <Table columns={columns} dataSource={appointments || []} />
    </div>
  )
}

export default Appointments
