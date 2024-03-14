from sqlalchemy import Column, Integer, String, UUID
from shared import BASE
from flask_login import UserMixin

import uuid


class Usher(BASE, UserMixin):
    """defines the table for the user"""

    __tablename__ = "ushers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=lambda: uuid.uuid4(), unique=True)
    email = Column(String(250), nullable=True)
    username = Column(String(250), nullable=False)
    password = Column(String(250), nullable=True)

    def get_data(self) -> dict:
        return {
            "id" : self.id,
            "email": self.email,
            "username" : self.username
            }