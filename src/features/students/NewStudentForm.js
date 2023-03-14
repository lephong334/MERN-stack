import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewStudentMutation } from './studentsApiSlice'
import { Form, Button } from 'react-bootstrap'

const NewStudentForm = () => {
  const [addNewStudent, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewStudentMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setPhone('')
      navigate('/dash/students')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onPhoneChanged = e => setPhone(e.target.value)

  const onSaveStudentClicked = async (e) => {
    e.preventDefault()
    await addNewStudent({ name, phone })
  }

  const content = (
    <Form onSubmit={onSaveStudentClicked}>
      <Form.Group className="mb-3">
        <Form.Label>Tên học viên</Form.Label>
        <Form.Control
          type="text"
          placeholder="Điền tên"
          id="name"
          name="name"
          value={name}
          onChange={onNameChanged}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Số điện thoại</Form.Label>
        <Form.Control
          type="text"
          placeholder="Điền số điện thoại"
          id="phone"
          name="phone"
          value={phone}
          onChange={onPhoneChanged}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Thêm
      </Button>
    </Form>
  )

  return content
}

export default NewStudentForm