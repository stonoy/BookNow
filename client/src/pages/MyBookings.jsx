import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppointmentCard from '../components/AppointmentCard'
import { ImSpinner8 } from 'react-icons/im'
import { getMyBookings, updateBooking } from '../feature/appointmentSlice'
import Pagination from '../components/Pagination'

const MyBookings = () => {
  const {loading, myBookings, numOfPages, page} = useSelector(state => state.appointment)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyBookings("/booking/getmybookings"))
  },[])

  if (myBookings?.length == 0){
    return <h1 className='w-fit mx-auto py-4'>No Appointments to show</h1>
  }

  if (loading){
    return (
      <div className='w-full h-[80vh] flex justify-center items-center'>
        <ImSpinner8 className='animate-spin text-xl'/>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2 items-center'>
      {
        myBookings?.map(booking => {
          return <AppointmentCard key={booking._id} {...booking?.appointment} bookingId={booking._id} selectedSlot={booking?.slot} booking={true} handleSlotFunc={updateBooking}/>
        })
      }
      <Pagination basePath={"/booking/getmybookings"} func={getMyBookings}  numOfPages={numOfPages} page={page}/>
    </div>
  )
}

export default MyBookings