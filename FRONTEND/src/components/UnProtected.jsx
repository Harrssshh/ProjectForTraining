import React from 'react'
import { Outlet } from 'react-router-dom'

const UnProtected = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default UnProtected
