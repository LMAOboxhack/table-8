import tt1_8.backend.classes.validation as V
from flask import jsonify, request
from main import app, db, User

# auth
@APP.route("/auth/register", methods=['POST'])
def register():
    """Calls the register function from auth.py"""
    data = request.get_json()
    password = data['password']
    V.valid_name(data['first_name'])
    V.valid_name(data['last_name'])
    V.valid_username(data['username'])
    V.valid_password(password)
    hashed_password = V.generate_token(password)
    new_user = User(first_name=data['first_name'], last_name=data['last_name'], username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.json()), 201


@APP.route("/auth/login", methods=['POST'])
def login():
    """Calls the login function from auth.py"""
    data = request.get_json()
    hashed_password = V.generate_token(data['password'])
    token = V.generate_token(data['username'])
    if V.correct_password(data['username'], hashed_password):
        return {
            "is_success": True,
            "token": token
        }
    else:
        return {
            "is_success": False
        }


@APP.route("/auth/logout", methods=['POST'])
def logout():
    """Calls the logout function from auth.py"""
    data = request.get_json()
    return {
        "is_success": True
    }

