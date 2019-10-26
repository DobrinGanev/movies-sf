import os
import settings
from flask import Flask
from flask_cors import CORS
from graphene import Schema
from flask_graphql import GraphQLView
from schema import Query
GQL_SERVER_PORT = os.environ["GQL_SERVER_PORT"]

# graphiql=True will serve the graphql browser IDE
view_func = GraphQLView.as_view(
    "graphql", schema=Schema(query=Query), graphiql=True)

app = Flask(__name__)

CORS(app)  # allow cors

app.add_url_rule("/graphql", view_func=view_func)

if __name__ == "__main__":
    app.run(port=GQL_SERVER_PORT)
