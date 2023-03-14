import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const DashFooter = () => {
  const { username, status } = useAuth()

  const date = new Date()
  const today = new Intl.DateTimeFormat('vie', { dateStyle: 'full', timeStyle: 'short' }).format(date)

  const content = (
    <footer>
      Footer
      {/* <p>Current User: {username}</p> */}
      {/* <p>Status: {status}</p> */}
      {/* <p>Time: {today}</p> */}
    </footer>
  )

  return content
}

export default DashFooter