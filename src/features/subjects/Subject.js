import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectSubjectById } from './subjectsApiSlice'

import React from 'react'
import { Button } from 'react-bootstrap'

const Subject = ({ subjectId }) => {
  const subject = useSelector(state => selectSubjectById(state, subjectId))

  const navigate = useNavigate()

  if (subject) {
    const handleEdit = () => navigate(`/dash/subjects/${subjectId}`)

    return (
      <tr>
        <td>{subject.title}</td>
        <td>{subject.description}</td>
        <td>{subject.session}</td>
        <td>{subject.tuition}</td>
        <td>
          <Button variant="warning" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </td>
      </tr>
    )
  } else return null
}

export default Subject