import os
import settings
import pymongo
# connection to mongo
DB_CONNECTION = os.environ["DB_CONNECTION"]
mongoClient = pymongo.MongoClient(DB_CONNECTION)


def dbConnection(dbName, collection):
    moviesDB = mongoClient[dbName]
    moviesCollection = moviesDB[collection]
    return moviesCollection
