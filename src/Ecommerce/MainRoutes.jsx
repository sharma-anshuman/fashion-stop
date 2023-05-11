import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Cart from './pages/Cart/Cart'
import Error from './pages/Error/Error'

const MainRoutes = () => {
  return (
    <React.Fragment>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Error />} />
        </Routes>
    </React.Fragment>
  )
}   

export default MainRoutes