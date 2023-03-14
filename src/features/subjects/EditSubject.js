import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectSubjectById } from './subjectsApiSlice'
import EditSubjectForm from './EditSubjectForm'
import { Spinner } from 'react-bootstrap'

const EditSubject = () => {
  const { id } = useParams()

  const subject = useSelector(state => selectSubjectById(state, id))

  const content = subject ? <EditSubjectForm subject={subject} /> : <Spinner />

  return content
}

export default EditSubject