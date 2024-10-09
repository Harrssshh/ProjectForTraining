import React from 'react'
import { Outlet } from 'react-router-dom'

const OpenRoute = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default OpenRoute
