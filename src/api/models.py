from flask_sqlalchemy import SQLAlchemy
from datetime import date
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'


    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(1000), unique=False, nullable=False)
    user_habit_list = db.relationship("User_habit_list", backref="user")
    habit_records = db.relationship("Habit_records", backref="user_records")
    score = db.Column(db.Integer, unique=False, default=0)

    def __repr__(self):
        return '<User %r>' % self.first_name

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "score": self.score,
            "user_habit_list": [habit.serialize() for habit in self.user_habit_list],
            "habit_records": [habit.serialize() for habit in self.habit_records],

        }
    

class Habits(db.Model):
    __tablename__ = 'Habits'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), unique=True, nullable=False)
    score = db.Column(db.Integer, unique=False)

    

    def __repr__(self):
        return '<Habits %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "score": self.score
        }
    
class Habit_records(db.Model):
    __tablename__ = 'habit_records'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=date.today)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"))   
    habits_id = db.Column(db.Integer, db.ForeignKey("Habits.id"))
    habits=db.relationship("Habits", backref="habit_records")
    

    def __repr__(self):
        return '<habit_records %r>' % self.habits_id

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
                       
        }




class User_habit_list(db.Model):
    __tablename__ = 'User_habit_list'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))   
    habits_id = db.Column(db.Integer, db.ForeignKey(Habits.id))
    habits = db.relationship("Habits", backref="User_habit_list")
    

    def __repr__(self):
        return '<User_habit_list %r>' % self.habits_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "habits_id": self.habits_id,
            "habit": self.habits.serialize() if self.habits else None
             # do not serialize the password, its a security breach
        }
    

    