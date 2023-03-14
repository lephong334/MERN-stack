import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Public = () => {

  const content = (
    <div className="public">
      <div className="public-inner">
        <h1>Trang quản lý Đào tạo Bình Dương</h1>
        <Button as={Link} to='/login'>Đăng nhập</Button>
      </div>    
    </div>
  )

  return content
}

export default Public