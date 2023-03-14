import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth()

  const navigate = useNavigate()
  const { pathname } = useLocation()
  
  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  const onLogoutClicked = () => sendLogout()

  if (isLoading) {
    return <p>Logging Out...</p>
  }

  if (isError) {
    return <p>Error: {error.data?.message}</p>
  }

  const logoutButton = (
    <Button variant="danger" onClick={onLogoutClicked}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </Button>
  )

  const content = (
    <Navbar className="dash-header">
      <Container>
        <Navbar.Brand as={Link} to='/dash'>Trang chủ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/dash/students'>Học viên</Nav.Link>
            <Nav.Link as={Link} to='/dash/classes'>Lớp</Nav.Link>
            <Nav.Link as={Link} to='/dash/subjects'>Môn học</Nav.Link>           
            {/* <Nav.Link as={Link} to='/dash/users'>Users</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
        {logoutButton}
      </Container>
    </Navbar>
  )

  return content
}

export default DashHeader