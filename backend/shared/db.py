from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session
from shared import BASE
from models.user import User
from sqlalchemy.exc import InvalidRequestError, NoResultFound



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
    
    def registerUser(self, **kwargs) -> User:
        user = User()
        try:
            for key, value in kwargs.items():                    
                user.__setattr__(key, value)
            self._session.add(user)
            self._session.commit()
        except Exception:
            self._session.rollback()
            user = None
        return user

    def searchUser(self, **kwargs):
        "finds a user in DB"
        keys = []
        for key, val in kwargs.items():
            if hasattr(User, key):
                keys.append(key)
            else:
                raise InvalidRequestError()
        for key in keys:
            result = self._session.query(User).\
                filter(User.__getattribute__(User, key) == kwargs.get(key)).first()
            if result is None:
                raise NoResultFound()
            return result
                
            
