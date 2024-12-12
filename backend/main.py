# from flask import request, jsonify
# from config import app, db
# from models import Contact


# @app.route("/contacts", methods=["GET"])
# def get_contacts():
#     contacts = Contact.query.all()
#     json_contacts = list(map(lambda x: x.to_json(), contacts))
#     return jsonify({"contacts": json_contacts})


# @app.route("/create_contact", methods=["POST"])
# def create_contact():
#     first_name = request.json.get("firstName")
#     last_name = request.json.get("lastName")
#     email = request.json.get("email")

#     if not first_name or not last_name or not email:
#         return (
#             jsonify({"message": "You must include a first name, last name and email"}),
#             400,
#         )

#     new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
#     try:
#         db.session.add(new_contact)
#         db.session.commit()
#     except Exception as e:
#         return jsonify({"message": str(e)}), 400

#     return jsonify({"message": "User created!"}), 201


# @app.route("/update_contact/<int:user_id>", methods=["PATCH"])
# def update_contact(user_id):
#     contact = Contact.query.get(user_id)

#     if not contact:
#         return jsonify({"message": "User not found"}), 404

#     data = request.json
#     contact.first_name = data.get("firstName", contact.first_name)
#     contact.last_name = data.get("lastName", contact.last_name)
#     contact.email = data.get("email", contact.email)

#     db.session.commit()

#     return jsonify({"message": "Usr updated."}), 200


# @app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
# def delete_contact(user_id):
#     contact = Contact.query.get(user_id)

#     if not contact:
#         return jsonify({"message": "User not found"}), 404

#     db.session.delete(contact)
#     db.session.commit()

#     return jsonify({"message": "User deleted!"}), 200


# if __name__ == "__main__":
#     with app.app_context():
#         db.create_all()

#     app.run(debug=True)

from flask import request, jsonify
from config import app, db 
from models import Contact, Company, Department

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
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

@app.route("/create_contact", methods=["POST"])
def create_contact():
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
        department_id=department_id
    )
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Contact created!", "contact": new_contact.to_json()}), 201

# Existing update and delete routes remain similar, just add checks for relationships

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)