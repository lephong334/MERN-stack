import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewSubjectMutation } from './subjectsApiSlice'
import { Form, Button } from 'react-bootstrap'

const NewSubjectForm = () => {
  const [addNewSubject, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewSubjectMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [session, setSession] = useState(0)
  const [tuition, setTuition] = useState(0)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setDescription('')
      setSession(0)
      setTuition(0)
      navigate('/dash/subjects')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)
  const onSessionChanged = e => setSession(e.target.value)
  const onTuitionChanged = e => setTuition(e.target.value)

  const onSaveSubjectClicked = async (e) => {
    e.preventDefault()
    await addNewSubject({ title, description, session, tuition })
  }

  const content = (
    <Form onSubmit={onSaveSubjectClicked}>
      <Form.Group className="mb-3">
        <Form.Label>Tên môn học</Form.Label>
        <Form.Control
          type="text"
          placeholder="Điền tên môn học"
          id="title"
          name="title"
          value={title}
          onChange={onTitleChanged}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mô tả môn học</Form.Label>
        <Form.Control
          type="text"
          placeholder="Điền mô tả"
          id="description"
          name="description"
          value={description}
          onChange={onDescriptionChanged}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Số buổi học</Form.Label>
        <Form.Control
          type="number"
          placeholder="Nhập số buổi"
          id="session"
          name="session"
          value={session}
          onChange={onSessionChanged}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Học phí</Form.Label>
        <Form.Control
          type="number"
          placeholder="Nhập học phí"
          id="tuition"
          name="tuition"
          value={tuition}
          onChange={onTuitionChanged}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Thêm
      </Button>
    </Form>
  )

  return content
}

export default NewSubjectForm