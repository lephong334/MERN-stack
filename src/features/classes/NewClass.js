import Spinner from 'react-bootstrap/Spinner'
import { useSelector } from 'react-redux'
import { selectAllSubjects } from '../subjects/subjectsApiSlice'
import NewClassForm from './NewClassForm'

const NewClass = () => {
  const subjects = useSelector(selectAllSubjects)

  const content = subjects ? <NewClassForm subjects={subjects} /> : <Spinner />

  return content
}

export default NewClass