from flask import Flask, flash, jsonify, redirect, request, render_template, url_for
## from formtest.registration import LoginForm, DB, RegistrationForm
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
       user = AUTH.db.searchUser(usher.Usher, id=user_id)
       print("trying.....................usher")
       return user
    except NoResultFound:
       try:
          user = AUTH.db.searchUser(planner.Planner, id=user_id)
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
    ### Change request.args.get() to request.form.get() ####
    username, password = (request.args.get('username'), request.args.get('password'))
    usertype = request.args.get('usertype')

    #Usertype determines what kind of user is logging-in (usher or planner)
    try:
       user = AUTH.login_user(usertype, username=username, password=password)
       if user is not None:
          login_user(user)
          """login_user(user)
          redirect_url = request.args.get("next")
          if redirect_url is not None:
             return redirect(redirect_url)"""
          print(type(user.id))
          return jsonify(user.get_data())
       else:
          return jsonify({"ERROR" : "USER NOT FOUND IN DB"})
    except NoResultFound as err:
       return jsonify({"Error": err.args[0], "reason" : "unauthorized user or invalid login reqst"})


@app.route('/dashboard', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def dashboard():
   return jsonify({"user": "loggedin"})

"""@app.route("/session_login", methods=['GET', 'POST'])
def session_login():
   try:
      
"""

@app.route('/logout', methods=['GET','POST'])
def logout():
  logout_user()
  return redirect('/')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")