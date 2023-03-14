import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth()

  const content = (
    <section>
      <h1>Welcome {username}!</h1>
      {/* <p><Link to='/dash/students'>View Students</Link></p>
      <p><Link to='/dash/classes'>View Classes</Link></p>
      <p><Link to='/dash/subjects'>View Subjects</Link></p>
      
      {(isManager || isAdmin) && <p><Link to='/dash/users'>View Users - Admin only</Link></p>}
      {(isManager || isAdmin) && <p><Link to='/dash/users/new'>Add New Users - Admin only</Link></p>} */}
    </section>
  )

  return content
}

export default Welcome