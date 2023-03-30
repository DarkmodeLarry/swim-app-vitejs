import { message } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ShowLoader } from '../../redux/loaderSlice'
import moment from 'moment'
import BookInstructorAppointment from '../../api/appointments/bookInstructorAppointment'
import GetInstructorAppointmentsOnDate from '../../api/appointments/getInstructorAppointmentsOnDate'
import GetInstructorById from '../../api/instructors/getInstructorById'
import { BsYinYang } from 'react-icons/bs'

function BookAppointment() {
  const [problem, setProblem] = useState('')
  const [date, setDate] = useState('')
  const [instructor, setInstructor] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [bookedSlots, setBookedSlots] = useState([])

  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetInstructorById(id)
      dispatch(ShowLoader(false))
      if (response.success) {
        setInstructor(response.data)
        console.log(response.data)
      } else {
        message.error(response.message)
      }

      dispatch(ShowLoader(false))
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  const getSlotsData = () => {
    const day = moment(date).format('dddd')
    if (!instructor.days.includes(day)) {
      return <h3>Coach is not available on {moment(date).format('MM-DD-YYYY')}</h3>
    }

    let startTime = moment(instructor.startTime, 'HH:mm')
    let endTime = moment(instructor.endTime, 'HH:mm')
    let slotDuration = 60 // in minutes
    const slots = []
    while (startTime < endTime) {
      // if(!bookedSlots?.find((slot) => slot.slot === startTime.format("HH:mm")))

      slots.push(startTime.format('HH:mm'))
      startTime.add(slotDuration, 'minutes')
    }
    return slots.map((slot) => {
      const isBooked = bookedSlots?.find(
        (bookedSlot) => bookedSlot.slot === slot && bookedSlot.status !== 'cancelled'
      )

      return (
        <div
          className='bg-[var()] p-2 cursor-pointer border-2 rounded w-64 h-full flex items-center justify-start'
          onClick={() => setSelectedSlot(slot)}
          style={{
            border: selectedSlot === slot ? '3px solid green' : '1px solid gray',
            backgroundColor: isBooked ? 'gray' : 'white',
            pointerEvents: isBooked ? 'none' : 'auto',
            cursor: isBooked ? 'not-allowed' : 'pointer',
            color: isBooked ? 'white' : 'black'
          }}
        >
          <span>
            {moment(slot, 'HH:mm').format('HH:mm A')} -{' '}
            {moment(slot, 'HH:mm').add(slotDuration, 'minutes').format('HH:mm A')}
          </span>
        </div>
      )
    })
  }

  const onBookAppointment = async () => {
    try {
      dispatch(ShowLoader(true))
      const payload = {
        instructorId: instructor.id,
        userId: JSON.parse(localStorage.getItem('user')).id,
        date,
        slot: selectedSlot,
        instructorName: `${instructor.firstName} ${instructor.lastName}`,
        userName: JSON.parse(localStorage.getItem('user')).name,
        bookedOn: moment().format('YYYY-MM-DD hh:mm A'),
        problem,
        status: 'pending'
      }
      const response = await BookInstructorAppointment(payload)
      if (response.success) {
        message.success(response.message)
        navigate('/profile')
      } else {
        message.error(response.message)
      }
      dispatch(ShowLoader(false))
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  const getBookedSlots = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetInstructorAppointmentsOnDate(id, date)
      dispatch(ShowLoader(false))
      if (response.success) {
        console.log(response.data)
        setBookedSlots(response.data)
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  useEffect(() => {
    if (date) {
      getBookedSlots()
    }
  }, [date])

  return (
    instructor && (
      <div className='p-2'>
        <hr />

        <div className='flex flex-col space-y-2 gap-1 my-1 w-full border-2'>
          <div className='border-b bg-[#9d9ea0] h-24 flex gap-4 items-center'>
            <div className='flex flex-col pl-[5%]'>
              <BsYinYang className='flex items-center mx-4 text-5xl opacity-50' />
            </div>
            <h1 className='uppercase my-1'>
              <b>
                {instructor?.firstName} {instructor?.lastName}
              </b>
              <p className='text-center capitalize italic'>Coach</p>
            </h1>
          </div>
          <div className='flex justify-start w-full border-b'>
            <h4 className='w-28'>
              <b className='capitalize'>Email : </b>
            </h4>
            <h4 className='capitalize'>{instructor.email}</h4>
          </div>
          <div className='flex justify-start text-sm capitalize w-full border-b'>
            <h4 className='w-28'>
              <b>Phone : </b>
            </h4>
            <h4>{instructor.phone}</h4>
          </div>
          <div className='flex justify-start text-sm capitalize w-full border-b'>
            <h4 className='w-28'>
              <b>Location : </b>
            </h4>
            <h4 className='text-sm'>{instructor.address}</h4>
          </div>
          <div className='flex justify-start text-sm capitalize w-full border-b'>
            <h4 className='w-28'>
              <b>Fee : </b>
            </h4>
            <h4 className='w-28'>
              ${instructor.fee} <span className='font-normal'>/Session</span>
            </h4>
          </div>
          <div className='flex justify-start text-sm capitalize w-full'>
            <h4 className='w-32'>
              <b>Days Available : </b>
            </h4>
            <h4 className='font-semibold '>{instructor.days.join(', ')}</h4>
          </div>
        </div>

        <hr />

        {/* slots here */}
        <div className='flex flex-col gap-1 my-2'>
          <div className='flex gap-2 w-[400px] items-end'>
            <div>
              <span>Select Date :</span>
              <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={moment().format('MM-DD-YYYY')}
              />
            </div>
          </div>

          <div className='flex gap-2'>{date && getSlotsData()}</div>

          {selectedSlot && (
            <div>
              <textarea
                className='border-2 w-[400px] h-[200px]'
                placeholder='Health conditions, injuries, or other concerns'
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows='10'
              ></textarea>
              <div className='flex gap-2 justify-center my-3'>
                <button
                  className='border '
                  onClick={() => {
                    navigate('/')
                  }}
                >
                  Cancel
                </button>
                <button className='border border-black/50' onClick={onBookAppointment}>
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default BookAppointment
