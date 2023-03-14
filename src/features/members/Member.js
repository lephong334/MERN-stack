import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCheck } from "@fortawesome/free-solid-svg-icons"
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectMemberById } from './membersApiSlice'

const Member = ({ memberId }) => {
  const member = useSelector(state => selectMemberById(state, memberId))
  console.log(member)

  if (member) {
    return (
      <tr>
        <td></td>
        <td></td>
        <td>
          <Button variant="success">
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </td>
        <td>
          <Button variant="success">
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </td>
      </tr>
    )
  } else return null
}

export default Member