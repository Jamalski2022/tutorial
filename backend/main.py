from flask import request, jsonify
from config import app, db, bcrypt 
from models import Contact, Company, Department, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# home route
@app.route('/')
def index():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to the Application</title>
    </head>
    <body>
        <h1>Welcome to the Application</h1>
        <p>Status: OK</p>
        <p>Version: 1.0</p>
    </body>
    </html>
    """, 200

# Company Routes
@app.route("/companies", methods=["GET"])
def get_companies():
    companies = Company.query.all()
    json_companies = list(map(lambda x: x.to_json(), companies))
    return jsonify({"companies": json_companies})

@app.route("/create_company", methods=["POST"])
def create_company():
    name = request.json.get("name")
    address = request.json.get("address")

    if not name:
        return jsonify({"message": "Company name is required"}), 400

    new_company = Company(name=name, address=address)
    try:
        db.session.add(new_company)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Company created!", "company": new_company.to_json()}), 201

# Department Routes
@app.route("/departments", methods=["GET"])
def get_departments():
    departments = Department.query.all()
    json_departments = list(map(lambda x: x.to_json(), departments))
    return jsonify({"departments": json_departments})

@app.route("/create_department", methods=["POST"])
def create_department():
    name = request.json.get("name")
    description = request.json.get("description")
    company_id = request.json.get("companyId")

    if not name or not company_id:
        return jsonify({"message": "Name and Company ID are required"}), 400

    new_department = Department(name=name, description=description, company_id=company_id)
    try:
        db.session.add(new_department)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Department created!", "department": new_department.to_json()}), 201

# Contact Routes (Updated)
@app.route("/contacts", methods=["GET"])
@jwt_required()
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

@app.route("/create_contact", methods=["POST"])
@jwt_required()
def create_contact():
    current_user_id = get_jwt_identity()
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    company_id = request.json.get("companyId")
    department_id = request.json.get("departmentId")

    if not first_name or not last_name or not email or not company_id:
        return jsonify({"message": "You must include a first name, last name, email, and company ID"}), 400

    new_contact = Contact(
        first_name=first_name, 
        last_name=last_name, 
        email=email,
        company_id=company_id,
        department_id=department_id,
        user_id=current_user_id  # Add user association
    )
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Contact created!", "contact": new_contact.to_json()}), 201
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return jsonify({"message": "Usr updated."}), 200


@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Validate input
    if not username or not email or not password:
        return jsonify({"message": "Missing username, email, or password"}), 400

    # Check if user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    # Create new user
    new_user = User(username=username, email=email)
    new_user.set_password(password)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({
        "message": "User created successfully", 
        "user": new_user.to_json()
    }), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Find user
    user = User.query.filter_by(username=username).first()

    # Validate credentials
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid username or password"}), 401

    # Create access token
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful", 
        "access_token": access_token,
        "user": user.to_json()
    }), 200

# Protected route example
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"user": user.to_json()}), 200

# Existing update and delete routes remain similar, just add checks for relationships

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)