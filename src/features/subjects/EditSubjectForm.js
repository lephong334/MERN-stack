import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateSubjectMutation, useDeleteSubjectMutation } from './subjectsApiSlice'
import { Form, Button, Modal } from 'react-bootstrap'

const EditSubjectForm = ({ subject }) => {
  const [updateSubject, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateSubjectMutation()

  const [deleteSubject, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteSubjectMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(subject.title)
  const [description, setDescription] = useState(subject.description)
  const [session, setSession] = useState(subject.session)
  const [tuition, setTuition] = useState(subject.tuition)
  //Show confirm delete
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('')
      setDescription('')
      setSession(0)
      setTuition(0)
      navigate('/dash/subjects')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)
  const onSessionChanged = e => setSession(e.target.value)
  const onTuitionChanged = e => setTuition(e.target.value)

  const onSaveSubjectClicked = async (e) => {
    await updateSubject({ id: subject.id, title, description, session, tuition })
  }

  const onDeleteSubjectClicked = () => setShow(true)

  const onConfirmDeleteClicked = async () => {
    await deleteSubject({ id: subject.id })
    setShow(false)
  } 


  const deleteAlert = (
    <Modal show={show} variant="danger">
      <Modal.Header>Xác nhận xóa môn học?</Modal.Header>
      <Modal.Body>
        Xóa môn học có lớp học liên quan sẽ phát sinh lỗi. Vui lòng thay đổi các lớp học nói trên bằng một môn học khác!
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
          <Form.Label>Tên môn học</Form.Label>
          <Form.Control
            type="text"
            placeholder="Đổi tên môn học"
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
            placeholder="Đổi mô tả"
            id="description"
            name="Description"
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
        <Button variant="primary" onClick={onSaveSubjectClicked}>
          Lưu
        </Button>
        <Button variant="danger" onClick={onDeleteSubjectClicked}>
          Xóa môn học
        </Button>
      </Form>
    </>
  )

  return content
}

export default EditSubjectForm