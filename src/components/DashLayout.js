import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Container from 'react-bootstrap/Container'

const DashLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default DashLayout