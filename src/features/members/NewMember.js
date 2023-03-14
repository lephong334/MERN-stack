import { Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectClassById } from "../classes/classesApiSlice"
import NewMemberForm from "./NewMemberForm"


const NewMember = () => {
  const { id } = useParams()

  const updateClass = useSelector(state => selectClassById(state, id))

  const content = updateClass ? <NewMemberForm updateClass={updateClass} /> : <Spinner />

  return content
}

export default NewMember