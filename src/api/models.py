from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'


    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return '<User %r>' % self.first_name

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    

class Habits(db.Model):
    __tablename__ = 'Habits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), unique=True, nullable=False)
    duration = db.Column(db.DateTime, unique=False, nullable=False)
    score = db.Column(db.Integer, unique=False)


    def __repr__(self):
        return '<Habits %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "duration": self.duration,
            "score": self.score
            # do not serialize the password, its a security breach
        }

class Habits_list(db.Model):
    __tablename__ = 'habits_list'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    habit_id = db.Column(db.Integer, db.ForeignKey('Habits.id'))
    duration = db.Column(db.DateTime, unique=False, nullable=False)
    completed = db.Column(db.Boolean, unique=False)
    habits = db.relationship('Habits', backref='habits', primaryjoin='Habits.id == Habits_list.habit_id')
    user = db.relationship('User', backref='user', primaryjoin='Habits_list.user_id == User.id')


    def __repr__(self):
        return '<User_habits_list %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "habits_id": self.habits_id,
            "duration": self.duration,
            "completed": self.completed
            # do not serialize the password, its a security breach
        }