"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route('/users', methods=['GET'])
# def getallusers():
#     all_users = User.query.all()
#     all_users = User.query.all()
#     list_users = [user.serialize() for user in all_users]
#     return jsonify(list_users), 200



@api.route('/signup', methods=['POST'])
def signup():
 
   request_body = request.get_json()
   print(request_body)
   user = User.query.filter_by(email=request_body["email"]).first()
   if user:
      return jsonify ({"msg":"User already registered"}), 400
   new_user = User(first_name=request_body["first_name"], last_name=request_body["last_name"], email=request_body["email"], password=request_body["password"], creation=request_body["creation"])
   db.session.add(new_user)
   db.session.commit()

   return jsonify({"msg":"User created"}), 200

@api.route('/login', methods=['POST'])
def login():
   request_body = request.get_json()
   email = request_body.get("email")
   password= request_body.get("password") 

   if not email or not password:
      return jsonify({"msg": "All fields are required"}), 400
   user = User.query.filter_by(email=email, password=password).first()

   if not user:
      return jsonify ({"msg":"Email and password are incorrect"}), 401
  
#    token = create_access_token(identity=user.email)
#    return jsonify({"msg":"logged", "token": token})

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    request_body = request.get_json()
    email = request_body.get("email")
    password = request_body.get("password")
    first_name = request_body.get("first_name")
    last_name = request_body.get("last_name")
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    if email:
        user.email = email
    if password:
        user.password = password
    if first_name:
        user.first_name = first_name
    if last_name:
        user.last_name = last_name

    db.session.commit()
    return jsonify({"msg": "User updated successfully"}), 200


@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted successfully"}), 200


@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(user.serialize()), 200