import random
from urllib.parse import quote
import uuid
from sqlalchemy import Column, Integer, String
from shared import BASE
from flask_login import UserMixin


class Planner(BASE, UserMixin):
    """defines the table for the user"""

    __tablename__ = "planners"
    session_id : str = ""
    __uuid = random.randbytes(20).hex()

    db_id = Column(Integer, primary_key=True, unique=True)
    id = Column(String(250), nullable=False, unique=True)
    email = Column(String(250), nullable=True)
    username = Column(String(250), nullable=False)
    password = Column(String(250), nullable=False)
    firstname = Column(String(250), nullable=True)
    lastname = Column(String(250), nullable=True)
    amount_to_pay = Column(Integer, unique=True)
    gender = Column(String(250), nullable=True)
    job_description = Column(String(250), unique=True)
    loaction = Column(String(250), nullable=True)
    phone = Column(Integer, unique=True)
    
    def __init__(self):
        id = Planner.__uuid + str(uuid.uuid4())
        self.id = quote(id)

    def get_data(self) -> dict:
        return {
            "id" : self.id,
            "email": self.email,
            "username" : self.username,
            "session_id" : self.session_id,
            }