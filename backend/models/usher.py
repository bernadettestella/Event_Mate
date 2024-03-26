from sqlalchemy import Column, Integer, String
from shared import BASE
from flask_login import UserMixin
import random
import uuid
from urllib.parse import quote



class Usher(BASE, UserMixin):
    """defines the table for the user"""

    __tablename__ = "ushers"
    session_id : str = ""
    __uuid = random.randbytes(2).hex()

    db_id = Column(Integer, primary_key=True, unique=True)
    id = Column(String(250), nullable=False, unique=True)
    email = Column(String(250), nullable=True)
    username = Column(String(250), nullable=False)
    password = Column(String(250), nullable=False)
    firstname = Column(String(250), nullable=True)
    lastname = Column(String(250), nullable=True)
    age = Column(Integer, unique=True)
    gender = Column(String(250), nullable=True)
    height = Column(Integer, unique=True)
    town = Column(String(250), nullable=True)
    state = Column(String(250), nullable=True)
    phone = Column(Integer, unique=True)
    
    def __init__(self):
        id = Usher.__uuid + str(uuid.uuid4())
        self.id = quote(id)

    def get_data(self) -> dict:
        return {
            "id" : self.id,
            "email": self.email,
            "username" : self.username,
            "session_id" : self.session_id,
            "jobs": []
            }
