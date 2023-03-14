import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateStudentMutation, useDeleteStudentMutation } from './studentsApiSlice'
import { Form, Button, Modal } from 'react-bootstrap'

const EditStudentForm = ({ student }) => {
  const [updateStudent, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateStudentMutation()

  const [deleteStudent, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteStudentMutation()

  const navigate = useNavigate()

  const [name, setName] = useState(student.name)
  const [phone, setPhone] = useState(student.phone)
  //Show confirm delete
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName('')
      setPhone('')
      navigate('/dash/students')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onPhoneChanged = e => setPhone(e.target.value)

  const onSaveStudentClicked = async (e) => {
    await updateStudent({ id: student.id, name, phone })
  }

  const onDeleteStudentClicked = async () => setShow(true)

  const onConfirmDeleteClicked = async () => {
    await deleteStudent({ id: student.id })
    setShow(false)
  }

  const deleteAlert = (
    <Modal show={show} variant="danger">
      <Modal.Header>Xác nhận xóa môn học?</Modal.Header>
      <Modal.Body>
        Xóa học viên có lớp học liên quan sẽ phát sinh lỗi. Vui lòng liên hệ quản lý!
      </Modal.Body>
      <div className="d-flex justify-content-end">
        <Button onClick={onConfirmDeleteClicked} variant="outline-danger">
          Đồng ý
        </Button>
        <Button onClick={() => setShow(false)} variant="outline-primary">
          Hủy
        </Button>
      </div>
    </Modal>
  )

  const content = (
    <>
      {deleteAlert}
      <Form onSubmit={e => e.preventDefault()}>
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
        <Button variant="primary" onClick={onSaveStudentClicked}>
          Lưu
        </Button>
        <Button variant="danger" onClick={onDeleteStudentClicked}>
          Xóa học viên
        </Button>
      </Form>
    </>
  )

  return content
}

export default EditStudentForm