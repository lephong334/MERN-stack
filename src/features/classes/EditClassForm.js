import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateClassMutation, useDeleteClassMutation } from './classesApiSlice'
import { Form, Button, Modal } from 'react-bootstrap'

const EditClassForm = ({ cls, subjects }) => {
  const [updateClass, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateClassMutation()

  const [deleteClass, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteClassMutation()

  const navigate = useNavigate()

  const [name, setName] = useState(cls.name)
  const [subject, setSubject] = useState(cls.subject)
  const [membersList, setMembersList] = useState([])
  //Show confirm delete
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName('')
      setSubject('')
      setMembersList([])
      navigate('/dash/classes')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onSubjectChanged = e => setSubject(e.target.value)
  
  const onSaveClassClicked = async (e) => {
    await updateClass({ name, subject, membersList })
  }
  
  const onDeleteClassClicked = async () => setShow(true)

  const onConfirmDeleteClicked = async () => {
    await deleteClass({ id: cls.id })
    setShow(false)
  }

  const options = subjects.map(subject => {
    return (
      <option key={subject.id} value={subject.id}> 
        {subject.title}
      </option>
    )
  })
  
  const deleteAlert = (
    <Modal show={show} variant="danger">
      <Modal.Header>Xác nhận xóa môn học?</Modal.Header>
      <Modal.Body>
        Xóa lớp học sẽ xóa toàn bộ dữ liệu liên quan kết quả học của học viên. Bạn chắc chắn chứ?
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            value={name}
            onChange={onNameChanged}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Select
            id="subject"
            name="subject"
            value={subject}
            onChange={onSubjectChanged}
          >
            {options}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={onSaveClassClicked}>
          Save
        </Button>
        <Button variant="danger" onClick={onDeleteClassClicked}>
          Delete
        </Button>
      </Form>
    </>
  )

  return content
}

export default EditClassForm