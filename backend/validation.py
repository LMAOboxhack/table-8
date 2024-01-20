import jwt
import string
import random
import hashlib
from flask import abort, request
from main import app, db, Itinerary, User, Destination

# generate token
def generate_token(username):
    msg = {
        'username': username
    }
    token = jwt.encode(msg, 'secret',
                       algorithm='HS256').decode('utf-8')
    return token

# check name is between 1-50 characters inclusive in length
def valid_name(name):
    if len(name) < 1:
        abort(401, description="Name cannot be empty.")
    elif len(name) > 50:
        abort(401, description="Please enter a name between 1-50 characters long.")
    else:
        return True

# check whether the username is already exist
def valid_username(username):
    username_exist = User.query.get(username)
    if username_exist:
        abort(401, description="Username is already exist.")
    else:
        return True

# check password validation
def valid_password(password):
    if len(password) < 8:
        abort(401, description="Password should contain at least 6 characters.")
    elif len(password) > 20:
        abort(401, description="length should be not be greater than 20.")
    elif not any(char.isdigit() for char in password):
        abort(401, description="Password should have at least one numeral.")         
    elif not any(char.isupper() for char in password):
        abort(401, description="Password should have at least one uppercase letter.")         
    elif not any(char.islower() for char in password):
        abort(401, description="Password should have at least one lowercase letter.")
    else:
        return True
    
# generate token
def generate_token(password):
    msg = {
        'password': password
    }
    token = jwt.encode(msg, 'secret',
                       algorithm='HS256').decode('utf-8')
    return token