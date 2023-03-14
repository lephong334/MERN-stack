import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectStudentById } from './studentsApiSlice'

import { Button } from 'react-bootstrap'

const Student = ({ studentId }) => {
  const student = useSelector(state => selectStudentById(state, studentId))

  const navigate = useNavigate()
  
  if (student) {
    const handleEdit = () => navigate(`/dash/students/${studentId}`)

    return (
      <tr>
        <td>{student.name}</td>
        <td>{student.phone}</td>
        <td>
          <Button variant="success">
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </td>
        <td>
          <Button variant="warning" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </td>
      </tr>
    )
  } else return null
}

export default Student