from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session
from shared import BASE
from models import usher, planner
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

    def searchUser(self, db_table: Union[usher.Usher, planner.Planner], **kwargs):
        "finds a user in DB"
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
            mylist.append(items.id)
        return mylist
