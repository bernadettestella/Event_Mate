from flask import Flask, render_template, url_for, redirect, flash, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager,login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, length, ValidationError
from flask_bcrypt import Bcrypt
import secrets
from itsdangerous import TimedJsonWebSignatureSerializer as Serializer, SignatureExpired, BadSignature
from email import send_email

app = Flask(__name__)
db = SQLAlchemy()
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'df02efcafd88339a979746fe'


db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id)) 
  
  
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    
    
class RegistrationForm(FlaskForm):
  username = StringField(validators=[InputRequired(), length(min=4, max=80)], render_kw={"placeholder": "Username"})
  email = StringField(validators=[InputRequired(), length(min=3, max=255)], render_kw={"placeholder": "Email"})
  password1 = PasswordField(validators=[InputRequired(), length(min=8, max=20)], render_kw={"placeholder": "Password"})
  submit = SubmitField('Register')
  

  def validate_username(self, username):
    existing_user = User.query.filter_by(username=username.data).first()
    if existing_user:
      raise ValidationError('That username already exists. Please use a different username.')
    
    
  def generate_reset_token(email):
    serializer = Serializer(app.config['SECRET_KEY'], expires_secs=3600)
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])
    
class LoginForm(FlaskForm):
  email = StringField('Email', validators=[InputRequired(), length(min=3, max=255)], render_kw={"placeholder": "Username"})
  password = PasswordField(validators=[InputRequired(), length(min=8, max=20)], render_kw={"placeholder": "Password"})
  submit = SubmitField('Login')
  
  
@app.route('/')
def home():
    return render_template('home.html')
  
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
      user = User.query.filter_by(email=form.email.data).first()
      if user and bcrypt.check_password_hash(user.password, form.password.data):
        login_user(user, remember=form.remember.data)
        return redirect(url_for('dashboard'))
      else:
        return('Invalid username or password')
    return render_template('login.html', form=form)
  
  
@app.route('/dashboard', methods=['GET','POST'])
@login_required
def dashboard():
  return render_template('dashboard.html')


@app.route('/logout', methods=['GET','POST'])
@login_required
def logout():
  logout_user()
  return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    flash('This is a test message.', 'info')
    form = RegistrationForm()
    
    if form.validate_on_submit():
      hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
      user = User(username=form.username.data, email=form.email.data, password=hashed_password)
      db.session.add(user)
      db.session.commit()
      
      flash('Registration was successfull')
      redirect(url_for('login'))
      
    return render_template('Register.html', form=form)
  
@app.route('/forgot password', method=[ 'POST'])
def forgot_password():
  email_data = request.form['email']
  if not email_data or not email_data.get('email'):
    return jsonify({'error': 'Email is required'}), 400
  
  user = User.query.filter_by(email=email_data.get('email')).first()
  if not user:
    return jsonify({'error': 'User not found'}), 404
  
  token = user.generate_reset_token()
  
  try:
    send_email(user.email, token)
  except Exception as e:
    print(e)
    return jsonify({'error': 'Failed to send email'}), 500
  
  return jsonify({'message': 'Password reset link sent to your email'})


@app.route("/reset_password/<token>", methods=["GET", "POST"])
def reset_password(token):
    serializer = Serializer(app.config['SECRET_KEY'])
    try:
        email = serializer.loads(token, salt=app.config['SECURITY_PASSWORD_SALT'], max_age=3600)
    except (BadSignature, SignatureExpired) as e:
        return jsonify({'error': 'Invalid or expired token'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    if request.method == "POST":
        password = request.form.get("password")
        if not password:
            return jsonify({'error': 'Password is required'}), 400
        user.password = password
        db.session.commit()
        return jsonify({'message': 'Password reset successful'}), 200
           
  
@app.route('/test-flash')
def test_flash():
    flash('This is a test message', 'info')
    return redirect(url_for('home'))
  
if __name__ == '__main__':
  app.run(debug=True)    
