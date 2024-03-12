from sqlalchemy import Column, Integer, String
from shared import BASE
from flask_login import UserMixin


class User(BASE, UserMixin):
    """defines the table for the user"""

    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    email = Column(String(250), nullable=False)
    userName = Column(String(250), nullable=False)
    password = Column(String(250), nullable=False)
