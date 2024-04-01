import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session
from shared import BASE
from models import usher, planner, job
from sqlalchemy.exc import InvalidRequestError, NoResultFound
from typing import Union, List



class DB:
    """DB class that handles everythig db operations"""

    def __init__(self) -> None:
        self._engine = create_engine("sqlite:///ops.db", echo=True)
        self.__session = None
        BASE.metadata.drop_all(self._engine)
        BASE.metadata.create_all(self._engine)
    
    @property
    def _session(self) -> Session:
        if self.__session is None:
            DBsession = sessionmaker(bind=self._engine)
            self.__session = DBsession()
        return self.__session
    
    def registerUser(self, db_table: Union[usher.Usher, planner.Planner], **kwargs) -> Union[usher.Usher, planner.Planner, None]:
        user = db_table()
        try:
            for key, value in kwargs.items():                   
                user.__setattr__(key, value)
            self._session.add(user)
            """print("CODE GOT HERE")"""
            self._session.commit()
        except Exception as e:
            print(e.args[0] + "HELLO")
            self._session.rollback()
            user = None
        return user

    def searchitem(self, db_table: Union[usher.Usher, planner.Planner, job.Job], **kwargs) -> Union[usher.Usher, planner.Planner, job.Job]:
        "finds an item in DB"
        keys = []
        for key, val in kwargs.items():
            if hasattr(db_table, key):
                keys.append(key)
            else:
                raise InvalidRequestError()
        for key in keys:
            result = self._session.query(db_table).\
                filter(db_table.__getattribute__(db_table, key) == kwargs.get(key)).first()
            if result is None:
                raise NoResultFound()
            return result
    
    """def search_user_by_id(self, db_table: Union[usher.Usher, planner.Planner], myid:str):
        result = self._session.query(db_table).filter(db_table.id == id).first()
        if result is None:
            raise NoResultFound()
        else:
            return result 
        
        print("I AM FREE?, {}".format(
            self._session.query(db_table).\
                filter(db_table.id == myid).first()))"""

    def list_all_users(self, user: Union[usher.Usher, planner.Planner]) -> List[str]:
        values = self._session.query(user).filter(user.id != None).all()
        mylist = []
        for items in values:
            mylist.append(items.username)
        return mylist
    
    def postjob(self, poster_id, kwargs:dict):
        job_instance = job.Job()
        try:
            job_instance.planner_id = poster_id
            for key, item in kwargs.items():
                if hasattr(job_instance, key):
                    job_instance.__setattr__(key, item)
            self._session.add(job_instance)
            self._session.commit()
            return job_instance
        except:
            self._session.rollback()
            raise Exception("ERROR ADDING JOB TO DB")
        
    def update(self, model : Union[usher.Usher, planner.Planner, job.Job], items:dict):
        for key, val in items.items():
            if key == "id" or key == "db_id":
                continue
            if hasattr(model, key):
                model.__setattr__(key, val)
        try:
            self._session.add(model)
            self._session.commit()
            return model
        except:
            raise Exception()
        
    """def save_hire(self, job : job.Job, json_str:str):
        """
    def process_hire(self, job : job.Job, usher : usher.Usher):
        try:
            list_of_ushers : List[str] = []
            if job.hired_ushers is None:
                print("job is None................!!!!!!!!")
                list_of_ushers.append(usher.get_data())
                print(len(list_of_ushers))
            else:
                #deserialize job.hired_ushers()
                ushers : List = json.loads(job.hired_ushers)
                for usher_ in ushers:
                    list_of_ushers.append(usher_)
            job.hired_ushers = json.dumps(list_of_ushers)
            self._session.add(job)
            self._session.commit()
            return json.loads(job.hired_ushers)
        except BaseException as e:
            print("THERE HAS BEEN AN ERROR {}".format(e.args))
