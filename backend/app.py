from flask import Flask, flash, jsonify, redirect, request, render_template, url_for
## from formtest.registration import LoginForm, DB, RegistrationForm
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_required, login_user, logout_user
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
    changed = user_id
    try:
       user = AUTH.db.search_user_by_id(usher.Usher, id=changed)
       return user
    except NoResultFound:
       try:
          user = AUTH.db.search_user_by_id(planner.Planner, id=changed)
          return user
       except NoResultFound:
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
       login_user(user)
       return jsonify(user.get_data())
    except NoResultFound as err:
       return jsonify({"Error": err})


@app.route('/dashboard', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def dashboard():
   uid = request.args.get('id')
   user = load_user(uid)
   return jsonify({user.username : user.is_active})

@app.route('/logout', methods=['GET','POST'])
def logout():
  logout_user()
  return redirect('/')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")