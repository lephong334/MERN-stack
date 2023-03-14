import { Link } from 'react-router-dom'
import { useGetStudentsQuery } from './studentsApiSlice'
import Student from './Student'
import { Button, Spinner, Table } from 'react-bootstrap'

const StudentsList = () => {
  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetStudentsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content, studentsContent

  if (isLoading) content = <Spinner />

  if (isError) {
    studentsContent = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = students

    const tableContent = ids?.length
        ? ids.map(studentId => <Student key={studentId} studentId={studentId} />)
        : null

    studentsContent = (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Tên học viên</th>
            <th>Số điện thoại</th>
            <th>Các lớp đăng ký</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </Table>
    )
  }

  content = (
    <>
      <Button as={Link} to='new'>Thêm học viên</Button>
      {studentsContent}  
    </>
  )

  return content
}

export default StudentsList