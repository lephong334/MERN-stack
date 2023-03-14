import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form } from 'react-bootstrap'

const SearchBar = ({ search, setSearchResults }) => {
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(search)

    const resultsArray = search.filter(search => search.title.includes(e.target.value))

    setSearchResults(resultsArray)
  }

  const handleSubmit = (e) => e.preventDefault()

  return (
    <>
      <Form>
        <Form.Group className="mb-3" onSubmit={handleSubmit}>
          <Form.Control 
            type="text"
            placeholder="Tìm kiếm"
            id="search"
            onChange={handleSearchChange}
          />
          <Button><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default SearchBar