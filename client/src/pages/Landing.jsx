import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImSpinner8 } from "react-icons/im";
import { createBooking, getAppointments } from '../feature/appointmentSlice';
import AppointmentCard from '../components/AppointmentCard';
import Pagination from '../components/Pagination';


const Landing = () => {
  const {loading, appointments, numOfPages, page} = useSelector(state => state.appointment)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAppointments("/appointment/getappointments"))
  },[])

  if (appointments?.length == 0){
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
        appointments?.map(appointment => {
          return <AppointmentCard key={appointment._id} {...appointment} handleSlotFunc={createBooking}/>
        })
      }
      <Pagination basePath={"/appointment/getappointments"} func={getAppointments} numOfPages={numOfPages} page={page}/>
    </div>
  )
}

export default Landing