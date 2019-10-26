import React, {useContext, useState, useEffect} from 'react'
import {Input} from 'reactstrap'
import {SearchContext} from '../SearchProvider'
import useDebounce from './useDebounce'

// no props, how cool is that
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(null)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  // get the from the SearchProvider what you need. in this case the search function
  const {search} = useContext(SearchContext)

  useEffect(() => {
    if (debouncedSearchTerm !== null) {
      search(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, search])

  const handleOnInputChange = event => {
    const term = event.target.value
    setSearchTerm(term)
  }
  return (
    <div
      style={{
        width: '300px',
        position: 'absolute',
        top: '10px',
        left: '20px',
        zIndex: 9999,
      }}
    >
      <Input placeholder='Search for movies' onChange={handleOnInputChange} />
    </div>
  )
}

export default SearchBar
