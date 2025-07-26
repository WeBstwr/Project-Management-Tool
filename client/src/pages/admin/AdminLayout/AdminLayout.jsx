import React from 'react'
import { Outlet } from 'react-router-dom'
import './adminLayout.css'

function AdminLayout() {
  return (
    <div className="admin-layout">
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout