import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './MainRoutes'

const EcommerceMain = () => {
  return (
    <React.Fragment>
        <BrowserRouter>
            <MainRoutes />
        </BrowserRouter>
    </React.Fragment>
  )
}

export default EcommerceMain