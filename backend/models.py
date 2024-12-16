from config import db
from flask_bcrypt import Bcrypt
from sqlalchemy.orm import relationship

bcrypt = Bcrypt()
# Many-to-One relationship between Contact and Department
# Many-to-One relationship between Contact and Company
# One-to-Many relationship between Company and Department

class Department(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    
    # Relationship with contacts
    contacts = db.relationship('Contact', back_populates='department', lazy='dynamic')
    
    # Relationship with company
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    company = db.relationship('Company', back_populates='departments')
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "companyId": self.company_id
        }

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    address = db.Column(db.String(200), nullable=True)
    
    # Relationship with departments
    departments = db.relationship('Department', back_populates='company', lazy='dynamic')
    
    # Relationship with contacts
    contacts = db.relationship('Contact', back_populates='company', lazy='dynamic')
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "departmentCount": self.departments.count(),
            "contactCount": self.contacts.count()
        }

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    # Relationship with department
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=True)
    department = db.relationship('Department', back_populates='contacts')
    
    # Relationship with company
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    company = db.relationship('Company', back_populates='contacts')

    # Relationship with user
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    user = relationship('User', back_populates='contacts')
    
    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "departmentId": self.department_id,
            "companyId": self.company_id,
            "userId": self.user_id
        }
    
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    
    # Relationship with contacts (optional, if you want to link users to contacts)
    contacts = relationship('Contact', back_populates='user')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }