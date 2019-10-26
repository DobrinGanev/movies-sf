import re
import bson
from graphene import ObjectType, String, Field, List
from Types import Movies  # the gql types
import db

# the db and the collection is called movies
moviesCollection = db.dbConnection('movies', 'movies')


class Query(ObjectType):
    search = Field(List(Movies), searchTerm=String(default_value=""))
    # when this resolver is executed will do full-text search in the collection movies
    # here I am also sorting them by text scrore

    def resolve_search(self, info, searchTerm):
        movies = moviesCollection.find(
            {
                "$text": {
                    "$search": searchTerm
                }
            }, {
                "score": {
                    "$meta": "textScore"
                }
            }).sort([('score', {'$meta': 'textScore'})]).limit(10)
        return movies
