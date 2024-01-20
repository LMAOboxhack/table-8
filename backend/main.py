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

class User(db.Model):
    def __init__(self, id, username, password, mcr, role_id):
        self.id = id
        self.username = username
        self.password = password
        self.mcr = mcr
        self.role_id = role_id
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    mcr = db.Column(db.String(7), nullable=True)
    role_id = db.Column(db.Integer, nullable=False)


@app.route('/')
def index():
   return render_template('index.html')

if __name__ == '__main__':
   app.run(debug=True)