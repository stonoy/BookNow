import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import {useDispatch, useSelector} from "react-redux"
import CreateAppointment from '../components/CreateAppointment';
import AppointmentCard from '../components/AppointmentCard';
import { createAppointment, getMyAppointments } from '../feature/appointmentSlice';
import Pagination from '../components/Pagination';

const Appointment = () => {
  const {loading, myAppointments, numOfPages, page} = useSelector(state => state.appointment)
  const dispatch = useDispatch()
  const [create, setCreate] = useState(false)

  useEffect(() => {
    dispatch(getMyAppointments("/appointment/getmyappointments"))
  }, [])

  if (create) {
    return <CreateAppointment setCreate={setCreate}/>
  }

  return (
    <div>
      <div className='flex items-center justify-end p-2'>
        <button className='btn btn-ghost' onClick={() => setCreate(true)}><FaPlus /></button>
      </div>
      <div>
      <div>
          {
            myAppointments?.length == 0 ?
            <h1 className='w-fit mx-auto py-4'>No Appointments to show</h1>
            :
            loading ?
            <div className='w-full h-[80vh] flex justify-center items-center'>
            <ImSpinner8 className='animate-spin text-xl'/>
          </div>
          :
          <div className='flex flex-col gap-2 items-center'>
      {
        myAppointments?.map(appointment => {
          return <AppointmentCard key={appointment._id} {...appointment} edit={true}/>
        })
      }
      <Pagination func={getMyAppointments} basePath={"/appointment/getmyappointments"} numOfPages={numOfPages} page={page}/>
          </div>
          }
      </div>
      </div>
    </div>
  )
}

export default Appointment