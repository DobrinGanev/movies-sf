from graphene import ObjectType, String

# the Movies type contains all the fields from the collection


class Movies(ObjectType):
    title = String()
    release_year = String()
    locations = String()
    production_company = String()
    director = String()
    writer = String()
    actor_1 = String()
    actor_2 = String()
    actor_3 = String()
