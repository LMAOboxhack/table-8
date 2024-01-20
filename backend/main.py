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
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

class Country(db.Model):
   def __init__(self, id, name):
      self.id = id
      self.name = name
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(255), nullable=False)

class Destination(db.Model):
   def __init__(self, id, country_id, cost, name, notes):
      self.id = id
      self.country_id = country_id
      self.
      self.name = name
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(255), nullable=False)


@app.route('/')
def index():
   return render_template('index.html')

if __name__ == '__main__':
   app.run(debug=True)