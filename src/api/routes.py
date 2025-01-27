"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session, redirect
from api.models import db, User, User_habit_list, Habit_records, Habits
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import date
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)





@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200




@api.route('/signup', methods=['POST'])
def signup():
 
   request_body = request.get_json()
   print(request_body)
   user = User.query.filter_by(email=request_body["email"]).first()
   if user:
      return jsonify ({"msg":"User already registered"}), 400
   new_user = User(first_name=request_body["first_name"], last_name=request_body["last_name"], email=request_body["email"], password=request_body["password"])
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
  
   token = create_access_token(identity=user.email)
   return jsonify({"msg":"logged", "token": token})
   

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


#endpoint para añadir/eliminar hábito de usuario, el usuario lo sacaremos del token

@api.route("/user/habits", methods=["POST", "GET", "DELETE"])
def manage_user_habits(user_id):
    if request.method == "POST": 
        request_body = request.get_json()
        exist = User_habit_list.query.filter_by(user_id=user_id, habits_id=request_body["habit_id"]).first()
        if exist:
            return jsonify({"msg": "Habit already added"}), 400
        
       
        new_habit = User_habit_list(user_id=user_id, habits_id=request_body["habit_id"])
        db.session.add(new_habit)
        db.session.commit()
        return jsonify(new_habit.serialize()), 200
    
    if request.method == "GET": 
        @jwt_required()
        def validate_token():
            token_id = get_jwt_identity()
            user=User.query.filter_by(id = token_id).first()
            if user is None:
                return jsonify({"msg":"user not found"}),404
            return jsonify({"msg":"User authenticated"}),200
        user_habit_list = User_habit_list.query.filter_by(user_id=user_id).all()
        return jsonify([habit.serialize() for habit in user_habit_list]), 200
    
    if request.method == "DELETE":
        request_body = request.get_json()
        habit = User_habit_list.query.filter_by(user_id=user_id, habits_id=request_body["habit_id"]).first()
        if habit:
            db.session.delete(habit)
            db.session.commit()
            return jsonify({"msg": "Habit deleted"}), 200
        else:
            return jsonify({"msg": "Habit not found"}), 404


#endpoint para devolver el ranking de los usuarios -> Devuélveme todos los usuarios ordenados por score
@api.route('/ranking', methods=['GET'])
def get_user_ranking():
    users = User.query.order_by(User.score.desc()).all()
    ranking = [user.serialize() for user in users]
    return jsonify({"ranking": ranking}), 200
    

#endpoint que devuelva el listado de hábitos para pintar en la home
@api.route('/habits', methods=['GET'])
def get_all_habits():
    habits = Habits.query.all()
    habits_list = [habit.serialize() for habit in habits]
    return jsonify({"habits": habits_list}), 200
    


#endpoint para el hábito completado por el usuario, el usuario hay que buscarlo con el token

@api.route('/complete_habit', methods=['POST'])
def complete_habit():
    request_body = request.get_json()
    user_id = request_body.get('user_id')
    habit_id = request_body.get('habit_id')
    
    
    if not user_id or not habit_id:
        return jsonify({"msg": "user_id y habit_id son requeridos"}), 400
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    habit = Habits.query.get(habit_id)

    if not habit:
        return jsonify({"msg": "Hábito no encontrado"}), 404
    
    # Verificar si el hábito está en el listado de hábitos del usuario
    user_habit = User_habit_list.query.filter_by(user_id=request_body["user_id"], habits_id=request_body["habit_id"]).first()
    if not user_habit:
        return jsonify({"error": "El hábito no pertenece al usuario"}), 400
    
    habit_record = Habit_records(
        user_id=user.id,
        habits_id=habit.id,
        date=date.today()
    )
    serialize_user=user.serialize()
    serialize_habit=habit.serialize()
    user.score=serialize_user["score"]+serialize_habit["score"]
    db.session.add(habit_record)
    

    db.session.commit()
    
    return jsonify({"message": "Hábito completado con éxito", "habit_record": habit_record.serialize() }), 201

#encriptar la contraseña con flask y crear el token


