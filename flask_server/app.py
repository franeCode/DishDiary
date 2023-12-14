from flask import Flask
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, get_jwt_identity
from datetime import timedelta
from dotenv import load_dotenv
import os
import sys

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
CORS(app)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
print(sys.path)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  return response
  
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
Session(app)
migrate = Migrate(app, db)
  
# Define a user loader callback
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]  
    user = Users.query.get(identity)
    return user  
  
from routes import *
from models import *
  
if __name__ == '__main__':
      port = int(os.environ.get("PORT", 5000))
      app.run(port=port, host="0.0.0.0")
