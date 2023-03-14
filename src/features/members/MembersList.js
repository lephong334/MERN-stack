import { useParams, Link } from 'react-router-dom'
import Member from './Member'
import { Button, Table, Spinner } from 'react-bootstrap'
import { selectAllMembers, useGetMembersQuery } from './membersApiSlice'
import { useSelector } from 'react-redux'

const MembersList = () => {
  const { id } = useParams()

  const {
    data: membersList,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMembersQuery(id)

  const testList = useSelector(selectAllMembers)

  console.log(membersList)
  console.log(testList)

  let content, membersContent

  if (isLoading) content = <Spinner />

  if (isError) {
    membersContent = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = membersList

    const tableContent = ids?.length ? ids.map((memberId) => <Member key={memberId} memberId={memberId} />) : null
    
    membersContent = (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số buổi</th>
            <th>Điểm danh</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </Table> 
    )

    content = (
      <>
        <Button as={Link} to='add'>Thêm học viên vào lớp</Button>
        {membersContent}
      </>
    )
  }

  return content
}

export default MembersList