from .db import DB, usher, planner
from typing import Union
from sqlalchemy.exc import InvalidRequestError, NoResultFound
import bcrypt



models = {"usher" : usher.Usher, "planner": planner.Planner}

class Auth:
    def __init__(self) -> None:
        self.db = DB()

    def register_user(self, cls, **kwargs):
        # checks if models exist
        if models.get(cls) is not None:
            for key in kwargs.keys():
                if hasattr(models.get(cls), key) is False:
                    raise Exception("Use valid class properties for {} class".format(cls))
            try:
                ## change kwargs.get('username') to kwargs.get('email') below
                self.db.searchUser(models.get(cls), username=kwargs.get('username'))
                return None
            except NoResultFound:
                new_user = self.db.registerUser(models.get(cls), **kwargs)
                if new_user is None:
                    raise InvalidRequestError("add required parms as stated in the {} model".format(cls))
                else:
                    return new_user
        else:
            raise Exception("No database found for the specified class")
    
    def login_user(self, cls, **kwargs) -> Union[usher.Usher, planner.Planner, None]:
        if models.get(cls) is not None:
            passwrd : str = kwargs.get('password')
            try:
                user = self.db.searchUser(models.get(cls), username=kwargs.get('username'))
                if bcrypt.checkpw(passwrd.encode('utf-8'), user.password):
                    return user
                else:
                    raise NoResultFound("Invalid Login supplied")
            except NoResultFound:
                return None
        else:
            raise NoResultFound("Invalid Class Defined")