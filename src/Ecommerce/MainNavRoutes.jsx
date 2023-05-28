import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

const MainNavRoutes = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default MainNavRoutes