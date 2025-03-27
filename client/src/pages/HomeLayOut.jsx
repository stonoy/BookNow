import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { links } from '../utils'
import { useSelector } from 'react-redux'

const HomeLayOut = () => {
  const {user} = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?._id){
      navigate("/login")
    }
  })

  return (
    <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <Header/>
    <div className='align-element py-2 bg-base-200'>
    <Outlet/>
    </div>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      {
        links.map(link => {
          if (link.name == "Appointments" && user?.role !== "owner") return
          if (link.name == "Admin" && user?.role !== "admin") return

          return <li key={link.id}><NavLink to={link.link} className={({ isActive, isPending }) =>
            isPending ? "text-gray-500" : isActive ? "text-green-500" : ""
          }>{link.name}</NavLink></li>
        })
      }
    </ul>
  </div>
</div>
  )
}

export default HomeLayOut