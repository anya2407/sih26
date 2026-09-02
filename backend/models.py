from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class State(db.Model):
    __tablename__ = "states"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    is_union_territory = db.Column(db.Boolean, default=False)

    monuments = db.relationship("Monument", backref="state_obj")


class Monument(db.Model):
    __tablename__ = "monuments"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)

    state = db.Column(
        db.Integer,
        db.ForeignKey("states.id"),
        nullable=False
    )

    locations = db.relationship("Location", backref="monument_obj")


class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)

    monument = db.Column(
        db.Integer,
        db.ForeignKey("monuments.id"),
        nullable=False
    )

    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    radius = db.Column(db.Float, nullable=False, default=50)

    description = db.Column(db.Text)