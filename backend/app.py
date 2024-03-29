from flask import Flask, abort, flash, jsonify, redirect, request, render_template, url_for
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_required, login_user, logout_user, current_user
from sqlalchemy.exc import NoResultFound
from shared.auth import Auth, usher, planner
from typing import Union


app = Flask(__name__)
app.config['SECRET_KEY'] = 'df02efcafd88339a979746fe'
bcrypt = Bcrypt(app)


AUTH = Auth()
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'



@login_manager.user_loader
def load_user(user_id: str) -> Union[None, usher.Usher, planner.Planner]:
    try:
       user = AUTH.db.searchitem(usher.Usher, id=user_id)
       print("trying.....................usher")
       return user
    except NoResultFound:
       try:
          user = AUTH.db.searchitem(planner.Planner, id=user_id)
          print("trying.....................planner")
          return user
       except NoResultFound:
         print("returning.............................None")
         return None


@app.route("/", strict_slashes=False)
def index() -> str:
    """GET /
     Return:
    - The home page's payload.
    """
    return render_template('home.html')


@app.route('/register', methods=['POST', 'GET'])
def register():
    ### Change request.args.get() to request.form.get() ####
    hashed_password = bcrypt.generate_password_hash(request.args.get('password'))
    username = request.args.get('username')
    usertype = request.args.get('usertype')
    email = request.args.get('email')

    ### the usertype determines what type of user is registering (usher or planner)
    user = AUTH.register_user(usertype, username=username, password=hashed_password, email=email)
    if user is None:
       return jsonify({"ERR": "User already exist"})
    else:
       return jsonify({user.username : user.id})


@app.route('/login', methods=['POST', 'GET'])
def login():
   try:
      ### Change request.args.get() to request.form.get() ####
      username, password = (request.args.get('username'), request.args.get('password'))
      usertype = request.args.get('usertype')
      session_id = request.cookies.get("session")

      #Usertype determines what kind of user is logging-in (usher or planner)
      user = AUTH.login_user(usertype, username=username, password=password)
      if user is not None:
         login_user(user)
         AUTH.set_session(user, session_id)
         """login_user(user)
          redirect_url = request.args.get("next")
          if redirect_url is not None:
             return redirect(redirect_url)"""
         return jsonify(user.get_data())
      else:
         return jsonify({"ERROR" : "USER NOT FOUND IN DB"})
   except NoResultFound as err:
       return jsonify({"Error": err.args[0], "reason" : "unauthorized user or invalid login reqst"})


@app.route('/dashboard', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def dashboard():
   user : Union[usher.Usher | planner.Planner] = current_user
   return jsonify({"user": user.username})


@app.route("/users/<user_type>", methods=["GET"])
def users(user_type):
   models = {"usher" : usher.Usher, "planner": planner.Planner}
   if user_type is None:
      return abort(400)
   try:
      users = AUTH.db.list_all_users(models.get(user_type))
      return jsonify({"users" : users})
   except:
      return abort(400)


@app.route("/user/<user_type>/<user_id>", methods=["GET"])
def user(user_type, user_id):
   models = {"usher" : usher.Usher, "planner": planner.Planner}
   if user_type is None:
      return abort(400)
   if user_id is None:
      try:
         users = AUTH.db.list_all_users(models.get(user_type))
         return jsonify({"users" : users})
      except:
         return abort(400)
   try:
      user = AUTH.db.searchUser(models.get(user_type), id=user_id)
      return jsonify({"user" : user.id})
   except NoResultFound:
      return jsonify({"err" : "No result found"})
   
@app.route("/postjob", methods=["GET", "POST"])
@login_required
def postjob():
   # ensure all forms fields are collected using request.form.get() and passed as
   # second arguments to the AUTH.search_secific_table() function below
   user = current_user
   confirmed_user = AUTH.search_specific_table("planner", id=user.id)
   if confirmed_user is None:
      abort(400)
   try:
      AUTH.db.postjob(confirmed_user.id, job_amount=2000)
      return jsonify({"status" : "ok"})
   except:
      abort(400)
   
"""@app.route("/hire/<usher_id>/<job_id>")
@login_required
def hire(usher_id, job_id):
   try:
      AUTH.hire(usher_id, job_id)
      return jsonify({"status": "ok"})
   except:
      abort(400)"""

@app.route("/update/<user_type>/<user_id>")
@login_required
def update_user(user_type, user_id):
   try:
      updated_user = AUTH.update_item(user_type, user_id, age=30)
      return jsonify({"status" : "ok", "response" : updated_user.age})
   except:
      abort(400)
   
   
@app.route('/logout', methods=['GET','POST'])
def logout():
  logout_user()
  return redirect('/')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")