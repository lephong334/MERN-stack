import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectAllStudents } from "../students/studentsApiSlice"
import { useUpdateClassMutation } from "../classes/classesApiSlice"
import { Form, Button } from "react-bootstrap"


const NewMemberForm = ({ updateClass }) => {
  const [addNewMember, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateClassMutation()

  const navigate = useNavigate()
  const students = useSelector(selectAllStudents)

  //Handle date format to fit input date
  const date = new Date()
  const today = date.toISOString().slice(0, 10)

  const [member, setMember] = useState(students[0].name)
  const [joinDate, setJoinDate] = useState(today)

  useEffect(() => {
    if (isSuccess) {
      setMember()
      setJoinDate()
      navigate(-1)
    }
  }, [isSuccess, navigate])

  const onMemberChanged = e => setMember(e.target.value)
  const onJoinDateChanged = e => setJoinDate(e.target.value)

  const onAddMemberClicked = async (e) => {
    e.preventDefault()
    await addNewMember({  })
  }

  const content = (
    <Form onSubmit={onAddMemberClicked}>
      <Form.Group className="mb-3">
        <Form.Label>Học viên</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          value={member}
          onChange={onMemberChanged}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ngày bắt đầu</Form.Label>
        <Form.Control
          type="date"
          id="joinDate"
          name="joinDate"
          value={joinDate}
          onChange={onJoinDateChanged}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Thêm
      </Button>
    </Form>
  )

  return content
}

export default NewMemberForm