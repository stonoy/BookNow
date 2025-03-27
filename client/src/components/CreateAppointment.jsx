import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../feature/appointmentSlice';
import moment from 'moment-timezone';
import { getCurrentLocalTime, getUtcFromLocalTime } from '../utils';

const CreateAppointment = ({setCreate}) => {
    const {submitting} = useSelector(state => state.appointment)
    const dispatch = useDispatch()

    const [appointment, setAppointment] = useState({
        name: "",
        timing: getCurrentLocalTime("YYYY-MM-DD HH:MM"),
        slots: [
            {
                starts: getCurrentLocalTime("YYYY-MM-DD HH:MM"),
                maxUsers: 25,
            }

        ]
    })

    const handleChange = (e) => {
        const {name , value} = e.target

        setAppointment(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        
    }

    const handleSlotChange = (e, i) => {
        const {name , value} = e.target

        const newSlots = appointment.slots.map((slot, idx) => {
            if (i == idx){
                if (name == "maxUsers"){
                    return {...slot, [name]: value > 0 ? value : 0}
                } else {
                    return {...slot, [name]: value}
                }
            }
            return slot
        })

        setAppointment(prev => {
            return {
                ...prev,
                slots: newSlots
            }
        })

        // appointment.slots[i][name] = value
    }

    const addSlot = () => {
        setAppointment(prev => {
            const newSlots = [...prev.slots, {
                starts: getCurrentLocalTime("YYYY-MM-DD HH:MM"),
                maxUsers: 25,
            }]

            return {...prev, slots: newSlots}
        })
    }

    const handleAdd = () => {
        let utcAppointment = {...appointment, timing: getUtcFromLocalTime(appointment.timing), slots: appointment.slots.map(slot => {return {...slot, starts: getUtcFromLocalTime(slot.starts)}})}
        dispatch(createAppointment(utcAppointment))
    }

  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
        <div className='w-3/4 p-4 bg-base-300 md:w-1/2 rounded-md shadow-md'>
        <div className='flex flex-col gap-4'>
            <button className='btn text-red-500 text-xl ml-auto' onClick={() => setCreate(false)}><MdOutlineCancel /></button>
            <div>
                <label htmlFor="name">Name</label>
                <input required className='ml-2 border-2' type='text' id='name' value={appointment.name} name='name' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="timing">Timing</label>
                <input className='ml-2 border-2' type='datetime-local' id='timing' value={appointment.timing} name='timing' onChange={handleChange}/>
            </div>

        </div>
        <div className='mt-4'>
            <div className='flex items-center justify-between'>
            <h1>Slots : </h1>
            <button className='btn btn-ghost' onClick={addSlot}><FaPlus /></button>
            </div>
            <div className='flex flex-col gap-4 mt-2'>
            {
                appointment.slots.map((slot, i) => {
                    return (
                        <div key={i}>
                            <div>
                <label htmlFor="starts">Starts</label>
                <input className='ml-2 border-2' type='datetime-local' id='starts' value={slot.starts} name='starts' onChange={(e) => handleSlotChange(e,i)}/>
            </div>
            <div>
                <label htmlFor="maxUsers">Max Users</label>
                <input className='ml-2 border-2' type='number' id='maxUsers' value={slot.maxUsers} name='maxUsers' onChange={(e) => handleSlotChange(e,i)}/>
            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
        <button disabled={submitting} onClick={handleAdd} className="btn btn-accent ml-auto mt-2">Add</button>
        </div>
    </div>
  )
}

export default CreateAppointment