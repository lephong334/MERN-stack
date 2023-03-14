import Spinner from 'react-bootstrap/Spinner'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAllSubjects } from '../subjects/subjectsApiSlice'
import { selectClassById } from './classesApiSlice'
import EditClassForm from './EditClassForm'

const EditClass = () => {
  const { id } = useParams()

  const cls = useSelector(state => selectClassById(state, id))
  
  const subjects = useSelector(selectAllSubjects)

  const content = subjects ? <EditClassForm cls={cls} subjects={subjects} /> : <Spinner />

  return content
}

export default EditClass