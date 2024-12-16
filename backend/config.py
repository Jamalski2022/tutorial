from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'Xeij4382'
app.config ["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False    


db = SQLAlchemy(app)
# added changes
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)