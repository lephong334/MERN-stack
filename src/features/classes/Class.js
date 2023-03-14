import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye, faClipboardCheck } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectClassById } from './classesApiSlice'
import { selectSubjectById } from '../subjects/subjectsApiSlice'
import { Button } from 'react-bootstrap'

const Class = ({ classId }) => {
  const cls = useSelector(state => selectClassById(state, classId))
  const subject = useSelector(state => selectSubjectById(state, cls.subject))

  const navigate = useNavigate()
  
  if (cls && subject) {
    const handleEdit = () => navigate(`/dash/classes/${classId}`)
    const handleAttendance = () => navigate(`/dash/classes/${classId}/attendance`)
    const handleViewMembers = () => navigate(`/dash/classes/${classId}/members`)

    return (
      <tr>
        <td>{cls.name}</td>
        <td>{subject.title}</td>
        <td>{cls.membersList.length}</td>
        <td>
          <Button variant="success" onClick={handleViewMembers}>
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </td>
        <td>
          <Button variant="success" onClick={handleAttendance}>
            <FontAwesomeIcon icon={faClipboardCheck} />
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

export default Class