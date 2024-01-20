from flask import FlFlask, render_template, request, send_from_directoryask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import platform

app = Flask(__name__, static_folder='static')

# DO NOT REMOVE
print(platform.system())
if platform.system() == "Darwin":
    # FOR MAC USERS
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/techteck24'
else:
    # FOR WINDOWS USERS
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/techteck24'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Country(db.Model):
   tablename = 'country'
   name = db.Column(db.String(50), nullable=False)
   
   def __init__(self, name):
      self.name = name
   
   def json(self):
      return {"name": self.name}
      

class Destination(db.Model):
   tablename = 'destination'
   country_id = db.Column(db.Integer, db.ForeignKey('country.id'), nullable=False)
   cost = db.Column(db.Float, nullable=False)
   name = db.Column(db.String(50), nullable=False)
   notes = db.Column(db.Text, nullable=True)

   def __init__(self, country_id, cost, name, notes):
      self.country_id = country_id
      self.cost = cost
      self.name = name
      self.notes = notes

   def json(self):
      return {"country_id": self.country_id, "cost": self.cost, "name": self.name, "notes": self.notes}
      

class User(db.Model):
   tablename = 'user'
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
      return {"first_name": self.first_name, "last_name": self.last_name, "password": self.password, "username": self.username}
      

class Itinerary(db.Model):
   tablename = 'itinerary'
   country_id = db.Column(db.Integer, db.ForeignKey('country.id'), nullable=False)
   user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
   budget = db.Column(db.Float, nullable=False)
   title = db.Column(db.String(100), nullable=False)

   def init(self, country_id, user_id, budget, title):
      self.country_id = country_id
      self.user_id = user_id
      self.budget = budget
      self.title = title

   def json(self):
      return {"country_id": self.country_id, "user_id": self.user_id, "budget": self.budget, "title": self.title}
      

class ItineraryDestination(db.Model):
   tablename = 'itinerary_destination'
   destination_id = db.Column(db.Integer, db.ForeignKey('destination.id'), nullable=False)
   itinerary_id = db.Column(db.Integer, db.ForeignKey('itinerary.id'), nullable=False)

   def init(self, destination_id, itinerary_id):
      self.destination_id = destination_id
      self.itinerary_id = itinerary_id

   def json(self):
      return {"destination_id": self.destination_id, "itinerary_id": self.itinerary_id}
      

if __name__ == '__main__':
   app.run(debug=True)