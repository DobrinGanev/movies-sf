import React, {createContext, useState, useCallback} from 'react'
import manualFetch from '../Graphql'
import {MOVIES_QUERY} from './queries'
export const SearchContext = createContext(null)

const SearchPrivider = props => {
  const [places, setPlaces] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)

  const onSelectPlace = item => {
    setSelectedPlace(item)
  }

  const search = useCallback(async searchTerm => {
    const result = await manualFetch(MOVIES_QUERY, {
      searchTerm: searchTerm,
    })
    // The data in the mongo collection has duplicate records. for now filter the duplicates here on the client
    const filteredSearch = result.search.filter(
      (item, index) =>
        index ===
        result.search.findIndex(
          t => t.locations === item.locations && t.title === item.title
        )
    )
    console.log(filteredSearch)
    setPlaces(filteredSearch)
  }, [])

  return (
    <>
      <SearchContext.Provider
        value={{
          search,
          places,
          onSelectPlace,
          selectedPlace,
        }}
      >
        {props.children}
      </SearchContext.Provider>
    </>
  )
}

export default SearchPrivider
