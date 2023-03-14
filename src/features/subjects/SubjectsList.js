import { Link } from 'react-router-dom'
import { useGetSubjectsQuery } from './subjectsApiSlice'
import Subject from './Subject'
import { Button, Spinner, Table, Container } from 'react-bootstrap'

const SubjectsList = () => {
  const {
    data: subjects,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSubjectsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content, subjectsContent
  if (isLoading) content = <Spinner />

  if (isError) {
    subjectsContent = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = subjects

    subjectsContent = ids?.length
      ? ids.map(subjectId => <Subject key={subjectId} subjectId={subjectId} />)
      : null
  }

  //Search funcion
  // const [searchQuery, setSearchQuery] = useState('')
  // const onSearchQueryChange = e => setSearchQuery(e.target.value)
  // let filteredSubject
  // if (searchQuery) {
  //   const { ids } = subjects
  //   console.log(ids)
  // }

  content = (
    <>
      <Container>      
        <Button as={Link} to='new'>Thêm môn học</Button>
        {/* <Form>
          <Form.Group className="mb-3">
            <Form.Control 
              type="text"
              placeholder="Tìm kiếm theo tên"
              id="search"
              onChange={onSearchQueryChange}
            />
          </Form.Group>
        </Form> */}
      </Container>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Tên môn</th>
            <th>Mô tả chi tiết</th>
            <th>Số buổi học</th>
            <th>Học phí</th>
            <th>Chỉnh sửa</th>
            </tr>
        </thead>
        <tbody>
          {subjectsContent}
        </tbody>
      </Table>
    </>
  )

  return content
}

export default SubjectsList