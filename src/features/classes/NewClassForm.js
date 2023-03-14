import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewClassMutation } from './classesApiSlice'
import { Form, Button } from 'react-bootstrap'

const NewClassForm = ({ subjects }) => {
  const [addNewClass, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewClassMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [subject, setSubject] = useState(subjects[0].id)
  const [membersList, setMembersList] = useState([])

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setSubject(subjects[0].id)
      setMembersList([])
      navigate('/dash/classes')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onSubjectChanged = e => setSubject(e.target.value)
  
  const onSaveClassClicked = async (e) => {
    e.preventDefault()
    await addNewClass({ name, subject, membersList })
  }

  const options = subjects.map(subject => {
    return (
      <option key={subject.id} value={subject.id}> 
        {subject.title}
      </option>
    )
  })

  const content = (
    <Form onSubmit={onSaveClassClicked}>
      <Form.Group className="mb-3">
        <Form.Label>Tên lớp</Form.Label>
        <Form.Control
          type="text"
          placeholder="Điền tên lớp học"
          id="name"
          name="name"
          value={name}
          onChange={onNameChanged}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Môn học</Form.Label>
        <Form.Select
          id="subject"
          name="subject"
          value={subject}
          onChange={onSubjectChanged}
        >
          {options}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Thêm
      </Button>
    </Form>
  )

  return content
}

export default NewClassForm