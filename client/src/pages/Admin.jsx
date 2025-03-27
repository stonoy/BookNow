import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, setOwner } from '../feature/userSlice'
import { ImSpinner8 } from 'react-icons/im'

const Admin = () => {
  const {loading, users} = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  },[])

  if (users?.length == 0){
    return <h1 className='w-fit mx-auto py-4'>No Users to show</h1>
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
        users?.map(user => {
          return (
            <div key={user._id} className='flex w-full justify-between p-2 items-center bg-gray-300 rounded-md shadow-md'>
              <h1 className='text-primary text-lg capitalize'>{user.name}</h1>
              <button className='btn btn-ghost' onClick={() => dispatch(setOwner(user._id))}>Set Owner</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Admin