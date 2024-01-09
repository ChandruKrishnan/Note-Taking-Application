# schema.py
import graphene
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class NoteType(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    content = graphene.String()

class UserType(graphene.ObjectType):
    id = graphene.ID()
    username = graphene.String()
    notes = graphene.List(NoteType)

class Query(graphene.ObjectType):
    user = graphene.Field(UserType, id=graphene.ID())
    all_users = graphene.List(UserType)

    def resolve_user(self, info, id):
        user = db.session.query(User).filter_by(id=id).first()
        if not user:
            raise ValueError(f"User with id {id} not found")
        user_data = {
            'id': user.id,
            'username': user.username,
            'notes': user.notes  # Assuming 'notes' is a relationship in your User model
        }
        return user_data

    def resolve_all_users(self, info):
         users = db.session.query(User).all()

        # Convert each user to the GraphQL UserType format
        all_users_data = [{
            'id': user.id,
            'username': user.username,
            'notes': user.notes  # Assuming 'notes' is a relationship in your User model
        } for user in users]

        return all_users_data


schema = graphene.Schema(query=Query)
