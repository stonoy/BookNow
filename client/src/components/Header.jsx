import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../feature/userSlice';

const Header = () => {
  const {user, submitting} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser()).then(({type}) => {
      if (type == "user/logout/fulfilled"){
        navigate("/login")
      }
    })
  }

  return (
    <div className='bg-base-300 border-b-2'>
        <div className="navbar align-element shadow-sm">
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
        <GiHamburgerMenu/>
    </label>
    </button>
  </div>
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">BookNow</Link>
  </div>
  <div className="flex-none">
  <div className='flex gap-2 items-center'>
            <h1 className='text-lg capitalize'>{user?.name}</h1>
            <button className='btn btn-ghost' disabled={submitting} onClick={handleLogout}>Logout</button>
        </div>
  </div>
</div>
    </div>
  )
}

export default Header

