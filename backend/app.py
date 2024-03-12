from flask import Flask, flash, jsonify, redirect, request, render_template, url_for
from formtest.registration import LoginForm, DB, RegistrationForm
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_required, login_user, logout_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'df02efcafd88339a979746fe'
bcrypt = Bcrypt(app)



login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return DB.searchUser(id=user_id)


@app.route("/", strict_slashes=False)
def index() -> str:
    """GET /
     Return:
    - The home page's payload.
    """
    return render_template('home.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    flash('This is a test message.', 'info')
    form = RegistrationForm()
    if form.validate_on_submit():
      hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
      DB.registerUser(username=form.username.data, email=form.email.data, password=hashed_password)
      flash('Registration was successfull')
      redirect(url_for('login'))
    return render_template('Register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
      user = DB.searchUser(email=form.email.data)
      if user and bcrypt.check_password_hash(user.password, form.password.data):
        login_user(user, remember=form.remember.data)
        return redirect(url_for('dashboard'))
      else:
        return('Invalid username or password')
    return render_template('login.html', form=form)

@app.route('/logout', methods=['GET','POST'])
@login_required
def logout():
  logout_user()
  return redirect(url_for('login'))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")