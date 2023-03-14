import { Link } from 'react-router-dom'
import { useGetClassesQuery } from './classesApiSlice'
import Class from './Class'
import { Button, Table, Spinner } from 'react-bootstrap'

const ClassesList = () => {
  const {
    data: classes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetClassesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content, classesContent

  if (isLoading) content = <Spinner />

  if (isError) {
    classesContent = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = classes

    const tableContent = ids?.length
      ? ids.map((classId) => <Class key={classId} classId={classId} />)
      : null

    classesContent = (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Tên lớp học</th>
            <th>Môn học</th>
            <th>Số lượng học viên</th>
            <th>Danh sách học viên</th>
            <th>Điểm danh</th>
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
      <Button as={Link} to='new'>Thêm lớp học</Button>
      {classesContent}
    </>
  )

  return content
}

export default ClassesList