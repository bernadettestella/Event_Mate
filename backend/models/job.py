import random
from urllib.parse import quote
import uuid
from sqlalchemy import Column, String, Integer, Text
from shared import BASE



class Job(BASE):
   
    
    __tablename__ = "jobs"
    __uniqueId = random.randbytes(20).hex()
    
    db_id = Column(String(250), primary_key=True, unique=True)
    id = Column(String(250), nullable=False)
    job_description = Column(String(250), nullable=True)
    job_amount = Column(Integer, nullable=False)
    hired_ushers = Column(Text, nullable=True)
    
    def __init__(self):
        id = Job.__uniqueId
        self.db_id = quote(str(uuid.uuid4()) + id)
