from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import platform

app = Flask(__name__)

# DO NOT REMOVE
print(platform.system())
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+mysqlconnector://root:root@localhost:3306/techtrek24"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/techteck24'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_recycle": 299}

db = SQLAlchemy(app)


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


@app.route("/destination/<string:id>", methods=["PUT"])
def update_destination(id):
    destination = Destination.query.filter_by(id=id).first()
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


@app.route("/destination/<string:id>", methods=["DELETE"])
def delete_destination(id):
    
    destination = Destination.query.filter_by(id=id).first()
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
