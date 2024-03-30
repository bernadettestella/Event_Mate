from .db import DB, usher, planner, job
from typing import Union
from sqlalchemy.exc import InvalidRequestError, NoResultFound
import bcrypt



models = {"usher" : usher.Usher, "planner": planner.Planner, "job": job.Job}

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
                self.db.searchitem(models.get(cls), username=kwargs.get('username'))
                return None
            except NoResultFound:
                new_user = self.db.registerUser(models.get(cls), **kwargs)
                print(new_user)
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
                user = self.db.searchitem(models.get(cls), username=kwargs.get('username'))
                if bcrypt.checkpw(passwrd.encode('utf-8'), user.password):
                    return user
                else:
                    raise NoResultFound("Invalid Login supplied")
            except NoResultFound:
                return None
        else:
            raise NoResultFound("Invalid Class Defined")
        
    def set_session(self, person: Union[usher.Usher, planner.Planner], session) -> Union[usher.Usher, planner.Planner, None]:
        if person is not None:
            person.session_id = session
            
    def search_specific_table(self, table_to_search, **kwargs) -> Union[usher.Usher, planner.Planner, job.Job, None]:
        table = models.get(table_to_search)
        if table == None:
            return None
        for key in kwargs.keys():
            if hasattr(table, key) is False:
                return None
        try:
            if table_to_search == "job":
                result = self.db.searchitem(table, db_id=kwargs.get("db_id"))
            else:
                result = self.db.searchitem(table, id=kwargs.get("id"))
            return result
        except:
            return None


    def update_item(self, table_to_update:str, item_id_to_update:str, **kwargs):
        result = self.search_specific_table(table_to_update, id=item_id_to_update)
        if result is None:
            raise Exception("INVALID ID")
        try:
            updated_item = self.db.update(result, kwargs)
            return updated_item
        except:
            raise Exception("ERROR UPDATING {}".format(result.__dict__.__class__.__name__))

        
    def hire(self, usher_id, job_id):
        job = self.search_specific_table("job", db_id=job_id)
        usher = self.search_specific_table("usher", id=usher_id)
        if job == None or usher == None:
            raise Exception("Invalid Job or Usher Id")
        try:
            updated_job = self.db.process_hire(job, usher)
            return updated_job
        except:
            raise Exception("Error Adding Usher To Job")
    