import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div className="fixed top-20 w-full px-[20%] h-[calc(100vh-5rem)]  overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default UserLayout