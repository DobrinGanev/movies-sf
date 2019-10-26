import React, {useContext} from 'react'
import {ListGroup, ListGroupItem, Card} from 'reactstrap'
import {SearchContext} from '../SearchProvider'

let id = 0
const identity = () => id++

const PlacesList = () => {
  // access the context of the SearchProvider, get what you need.
  const {places, onSelectPlace} = useContext(SearchContext)

  if (!places || !places.length) {
    return null
  }

  return (
    <Card
      style={{
        width: '300px',
        position: 'absolute',
        overflowY: 'scroll',
        overflowX: 'hidden',
        zIndex: 9999,
        top: '50px',
        left: '20px',
        height: '400px',
      }}
    >
      <ListGroup>
        {places.map(item => {
          return (
            <ListGroupItem
              onClick={() => onSelectPlace(item.locations)}
              key={identity()}
            >
              Location:{item.locations} - Movie title:{item.title} - cast:{' '}
              {item.actor1} {item.actor2}, {item.actor3}
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </Card>
  )
}

export default PlacesList
