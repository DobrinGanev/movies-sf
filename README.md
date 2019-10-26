## Architecture

What is this? This is a high-level architecture POC.

## The Stack

## Front-End

1. React V16.10.2 with react hooks API
2. MapBox with mapbox-gl
3. GraphQL (custom hook) using windows.fetch

## Back-Ends

1. Node.js. The Node is serving the front end of the web app(in production only), and proxying the GraphQL requests to the GraphQL server.

2.GraphQL server(with Python). This server is responsible for accepting requests form the Node backend, querying the storage and resolving the queries.

## Storage - Database

MongoDB is used to store and retrieve data through GraphQL resolvers.

The GraphQL resolver is performing a full-text search on the database. The collection is indexed by three fields `locations`, `text` and `actor_1`
Note this is a full-text search and not a partial search. For example, searching for the word `City` will return matching documents, but querying a partial word as `Ci` will not.

### Requirements to run the App

1. Installed Node.js
1. Python 3 and pip3
1. You need access to MongoDB database. The database connection is in python/.env file `DB_CONNECTION = mongodb://localhost:27017/`

### Scripts

1. install all the packages on the client:
   `cd /client` run `npm i`
2. install all the packages on the Node.js server:
   `cd /server` run `npm i`
3. install all the packages on python GraphQL server:
   `cd /python` run `pip3 install -r requirements.txt`

### Import the data to MongoDB

All the import and running scripts are on the Node.js server side

1. To import the data into MongoDB do `cd server` and run `npm run import-data`

## Start the application in dev mode.

`cd server` run `npm run dev`

This should start the back-end node server, the front end dev server and the GraphQL python server

How it works:
The user types a text in a search bar. The request is sent as a GraphQL query to the Node server, the node server sends the request to the GraphQL server and after the query is executed in MongoDB the result is resolved back to the Node and the Node passes it back to the client.

On the client, the results are displayed in a list and when the user clicks on one of the items, map box service finds the best match of the location.

React -> Node.js -> Python(GraphQL) -> MongoDB
MongoDB -> Python(GraphQL) -> Node.js -> React

# Test the search in the Graphql Browser IDE

go to http://localhost:5002/graphql

If you wonder where is coming from This IDE is served from the python GraphQL server

put this query and run it

```
{
  search(searchTerm:"City"){
    locations
    title
    actor1
    actor3
  }
}
```
