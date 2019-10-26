// a graphql query that takes search string and returns the collection values.
export const MOVIES_QUERY = `
query search($searchTerm: String) {
    search(searchTerm: $searchTerm) {
        title
        releaseYear
        locations
        productionCompany
        director
        writer
        actor1
        actor2
        actor3
    }
  }
  `
