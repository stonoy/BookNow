import React, { useState } from 'react'
import { getCurrentLocalTime, getLocalFromUtcTime } from '../utils';
import { useDispatch } from 'react-redux';
import { TiTick } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
import { cancelAppointment, deleteBooking, rescheduleAppointment } from '../feature/appointmentSlice';

const AppointmentCard = ({_id, edit, name, owner, timing, status, slots, booking, bookingId, selectedSlot, handleSlotFunc} ) => {
  const [reschedule, setReschedule] = useState(false)
  const [theAppointment, setTheAppointment] = useState({
    name,
    timing: getLocalFromUtcTime(timing, "YYYY-MM-DD HH:MM"),
    slots : slots.map(slot => {return {...slot, starts: getLocalFromUtcTime(slot.starts, "YYYY-MM-DD HH:MM")}})
  })
  const dispatch = useDispatch()
    
  // console.log(edit, name)
  const handleChange = (e) => {
    const {name , value} = e.target

    setTheAppointment(prev => {
        return {
            ...prev,
            [name]: value
        }
    })
    
}

const handleSlotChange = (e, i) => {
  const {name , value} = e.target

  const newSlots = theAppointment.slots.map((slot, idx) => {
      if (i == idx){
          if (name == "maxUsers"){
              return {...slot, [name]: value > 0 ? value : 0}
          } else {
              return {...slot, [name]: value}
          }
      }
      return slot
  })

  setTheAppointment(prev => {
      return {
          ...prev,
          slots: newSlots
      }
  })

  // appointment.slots[i][name] = value
}

    return (
      <div className={`bg-white shadow-md rounded-lg p-6 w-full max-w-md border  ${status == "cancelled" ? "border-red-400" : "border-gray-200"}`}>
        <div className='relative'>
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <h2 className="text-lg capitalize text-slate-800">{owner?.name}</h2>
        {
          reschedule ? 
        <div className='flex gap-1 items-center'>
          <input type='datetime-local' className='text-sm border-2 text-gray-600' name='timing' value={theAppointment.timing} onChange={handleChange}/>
          <button className='text-xl text-red-600' onClick={() => setReschedule(prev => !prev)}><MdOutlineCancel /></button>
        </div>
          :
          <p className="text-sm text-gray-600">{getLocalFromUtcTime(timing, "YYYY-MM-DD HH:MM")}</p>
        }
        
        <span
          className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
            status === "ontime"
              ? "bg-green-100 text-green-700"
              : status === "rescheduled"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
        {
          edit ?
          <div className='absolute top-2 right-2 flex flex-col gap-1 items-center md:flex-row'>
          <div>
            {
              reschedule ?
              
                <button className='btn border-2 border-yellow-400 text-slate-700' onClick={() => dispatch(rescheduleAppointment({data:theAppointment, appointmentId: _id}))}>Update</button>
              
              :
              <button className='btn border-2 border-yellow-400 text-slate-700' onClick={() => setReschedule(prev => !prev)}>Reschedule</button>
          
            }
          </div>
          <button className='btn border-2 border-red-400 text-slate-700' onClick={() => dispatch(cancelAppointment(_id))}>Cancel</button>
        </div>
        :
        booking ?
        <div className='absolute top-2 right-2 flex flex-col gap-1 items-center md:flex-row'>
          <button className='btn border-2 border-red-400 text-slate-700' onClick={() => dispatch(deleteBooking(bookingId))}>Cancel Booking</button>
        </div>
        :
        <></>
        }
        </div>
  
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-700">Available Slots</h3>
          <ul className="mt-2">
            {slots.map((slot, i) => {

              const bookingPercentage = (slot.users*100)/slot.maxUsers
              const slotColour = bookingPercentage < 50 ? "bg-green-100" : bookingPercentage < 90 ? "bg-yellow-100" : "bg-red-100"

              return (
                <div key={slot._id}>
                  {
                    reschedule ?
                    <div className='flex gap-1 items-center'>
          <input type='datetime-local' className='text-sm border-2 text-gray-600' name='starts' value={theAppointment.slots[i].starts} onChange={(e) => handleSlotChange(e, i)}/>
          {/* <button className='text-xl text-green-600'><TiTick /></button> */}
                    </div>
                    :
                    <li
                  
                  className={`flex justify-between items-center ${slotColour} px-3 py-2 rounded-md mt-2 ${slot._id == selectedSlot ? "border-2 border-slate-500" : ""}`}
                  onClick={() => dispatch(handleSlotFunc({appointment: _id, slot: slot._id, bookingId}))}
                >
                  <span className="text-gray-700">
                    {getLocalFromUtcTime(slot.starts, "LT")}
                  </span>
                  <span className="text-sm text-gray-500">
                    {slot.users}/{slot.maxUsers} booked
                  </span>
                </li>
                  }
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    );
  };
  
  export default AppointmentCard;