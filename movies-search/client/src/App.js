import React from 'react'
import Map from './Map'
import SearchBar from './SearchBar'
import SearchProvider from './SearchProvider'
import PlacesList from './PlacesList'
import {Container, Row, Col} from 'reactstrap'

/* 
Here I am  wrapping the entire app in the provider(SearchProvider) component so the child components
 can have an access to it's functions/hooks without the need of passing them props
*/
const App = () => {
  return (
    <SearchProvider>
      <Container fluid className={'full-width'}>
        <Row>
          <Col>
            <SearchBar />
            <PlacesList />
            <Map />
          </Col>
        </Row>
      </Container>
    </SearchProvider>
  )
}

export default App
