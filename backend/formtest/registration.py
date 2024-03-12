from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, length, ValidationError
from models.user import User
from shared.db import DB

#DB INSTANCE INITIALIZED
DB = DB()

class RegistrationForm(FlaskForm):
  username = StringField(validators=[InputRequired(), length(min=4, max=80)], render_kw={"placeholder": "Username"})
  email = StringField(validators=[InputRequired(), length(min=3, max=255)], render_kw={"placeholder": "Email"})
  password1 = PasswordField(validators=[InputRequired(), length(min=8, max=20)], render_kw={"placeholder": "Password"})
  submit = SubmitField('Register')

  def validate_username(self, username):
    try:
       DB.searchUser(username=username.data).first()
       raise ValidationError('That username already exists. Please use a different username.')
    except:
      pass


class LoginForm(FlaskForm):
  email = StringField('Email', validators=[InputRequired(), length(min=3, max=255)], render_kw={"placeholder": "Username"})
  password = PasswordField(validators=[InputRequired(), length(min=8, max=20)], render_kw={"placeholder": "Password"})
  submit = SubmitField('Login')
  