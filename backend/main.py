from flask import Flask, render_template, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import platform
import tt1_8.backend.classes.validation as V
import jwt

app = Flask(__name__, static_folder="static")

# DO NOT REMOVE
print(platform.system())
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+mysqlconnector://root:root@localhost:3306/techtrek24"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/techteck24'

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


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

def correct_password(username, password):
    user = User.query.get(username)
    correct_password = user.password
    if user:
        if correct_password == password:
            return True
        else:
            abort(401, description="Wrong password.")
    else:
        abort(401, description="The username is not exist.")

class Country(db.Model):
    tablename = "country"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __init__(self, name):
        self.name = name

    def json(self):
        return {"name": self.name}


class Destination(db.Model):
    tablename = "destination"
    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey("country.id"), nullable=False)
    cost = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text, nullable=True)

    def __init__(self, country_id, cost, name, notes):
        self.country_id = country_id
        self.cost = cost
        self.name = name
        self.notes = notes

    def json(self):
        return {
            "country_id": self.country_id,
            "cost": self.cost,
            "name": self.name,
            "notes": self.notes,
        }


class User(db.Model):
    tablename = "user"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    username = db.Column(db.String(20), nullable=False)

    def init(self, username, first_name, last_name, password):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.password = password

    def json(self):
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "password": self.password,
            "username": self.username,
        }


class Itinerary(db.Model):
    tablename = "itinerary"
    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey("country.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    budget = db.Column(db.Float, nullable=False)
    title = db.Column(db.String(100), nullable=False)

    def init(self, country_id, user_id, budget, title):
        self.country_id = country_id
        self.user_id = user_id
        self.budget = budget
        self.title = title

    def json(self):
        return {
            "country_id": self.country_id,
            "user_id": self.user_id,
            "budget": self.budget,
            "title": self.title,
        }


class ItineraryDestination(db.Model):
    tablename = "itinerary_destination"
    id = db.Column(db.Integer, primary_key=True)
    destination_id = db.Column(
        db.Integer, db.ForeignKey("destination.id"), nullable=False
    )
    itinerary_id = db.Column(db.Integer, db.ForeignKey("itinerary.id"), nullable=False)

    def init(self, destination_id, itinerary_id):
        self.destination_id = destination_id
        self.itinerary_id = itinerary_id

    def json(self):
        return {
            "destination_id": self.destination_id,
            "itinerary_id": self.itinerary_id,
        }

@app.route("/auth/register", methods=['POST'])
def register():
    """Calls the register function from auth.py"""
    data = request.get_json()
    password = data['password']
    valid_name(data['first_name'])
    valid_name(data['last_name'])
    valid_username(data['username'])
    valid_password(password)
    hashed_password = generate_token(password)
    new_user = User(first_name=data['first_name'], last_name=data['last_name'], username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.json()), 201


@app.route("/auth/login", methods=['POST'])
def login():
    """Calls the login function from auth.py"""
    data = request.get_json()
    hashed_password = generate_token(data['password'])
    token = generate_token(data['username'])
    if correct_password(data['username'], hashed_password):
        return {
            "is_success": True,
            "token": token
        }
    else:
        return {
            "is_success": False
        }


@app.route("/auth/logout", methods=['POST'])
def logout():
    """Calls the logout function from auth.py"""
    data = request.get_json()
    return {
        "is_success": True
    }
@app.route("/<string:user_id>/details", methods=['GET'])
def dashboard(user_id):
    user = User.query.filter_by(user_id=user_id)
    destination = Destination.query.filter_by(user_id=user_id)
    itinerarydestination = ItineraryDestination.query.filter_by(user_id=user_id)
    itinerary = Itinerary.query.filter_by(user_id=user_id)
    country = Country.query.filter_by(user_id=user_id)
# itinerary title, budget, country, list of destination included
    itinerary_title = itinerary.title
    itinerary_id = itinerary.id
    budget = itinerary.budget
    country = country.name
    dict_destination = {}
    while list_of_destination_id:
        list_of_itinerary_id = itinerarydestination.query.filter_by(itinerary_id=itinerary_id)
        list_of_destination_id = list_of_itinerary_id.destination_id
        list_destination = destination.query.filter_by(id = list_of_destination_id)
    return True
@app.route("/destination", methods=["POST"])
def create_destination():
    data = request.get_json()
    destination = Destination(
        country_id=data["country_id"],
        cost=data["cost"],
        name=data["name"],
        notes=data["notes"],
    )
    try:
        db.session.add(destination)
        db.session.commit()
    except:
        return jsonify({"message": "An error occurred creating the destination."}), 500
    return jsonify(destination.json()), 201


@app.route("/destination/<string:destination_id>", methods=["PUT"])
def update_destination(destination_id):
    destination = Destination.query.filter_by(destination_id=destination_id).first()
    if destination:
        data = request.get_json()
        destination.country_id = data["country_id"]
        destination.cost = data["cost"]
        destination.name = data["name"]
        destination.notes = data["notes"]
        try:
            db.session.commit()
        except:
            return (
                jsonify({"message": "An error occurred updating the destination."}),
                500,
            )
        return jsonify(destination.json()), 200
    return jsonify({"message": "destination not found."}), 404


@app.route("/destination/<string:destination_id>", methods=["DELETE"])
def delete_destination(destination_id):
    destination = Destination.query.filter_by(destination_id=destination_id).first()
    if destination:
        try:
            db.session.delete(destination)
            db.session.commit()
        except:
            return (
                jsonify({"message": "An error occurred deleting the destination."}),
                500,
            )
        return jsonify({"message": "destination deleted."}), 200
    return jsonify({"message": "destination not found."}), 404



if __name__ == "__main__":
    app.run(debug=True)
