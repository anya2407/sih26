from flask import Flask, request, jsonify, render_template, redirect
from flask_cors import CORS
from models import db, State, Monument, Location

from math import radians, sin, cos, sqrt, atan2
import llmcall


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///heritage.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
CORS(app)

# =========================================================
# STATES
# =========================================================

STATES_AND_UTS = [
    ("Andhra Pradesh", False),
    ("Arunachal Pradesh", False),
    ("Assam", False),
    ("Bihar", False),
    ("Chhattisgarh", False),
    ("Goa", False),
    ("Gujarat", False),
    ("Haryana", False),
    ("Himachal Pradesh", False),
    ("Jharkhand", False),
    ("Karnataka", False),
    ("Kerala", False),
    ("Madhya Pradesh", False),
    ("Maharashtra", False),
    ("Manipur", False),
    ("Meghalaya", False),
    ("Mizoram", False),
    ("Nagaland", False),
    ("Odisha", False),
    ("Punjab", False),
    ("Rajasthan", False),
    ("Sikkim", False),
    ("Tamil Nadu", False),
    ("Telangana", False),
    ("Tripura", False),
    ("Uttar Pradesh", False),
    ("Uttarakhand", False),
    ("West Bengal", False),

    ("Andaman and Nicobar Islands", True),
    ("Chandigarh", True),
    ("Dadra and Nagar Haveli and Daman and Diu", True),
    ("Delhi", True),
    ("Jammu and Kashmir", True),
    ("Ladakh", True),
    ("Lakshadweep", True),
    ("Puducherry", True),
]

def seed_states():
    if State.query.count() == 0:

        for name, is_ut in STATES_AND_UTS:
            db.session.add(
                State(
                    name=name,
                    is_union_territory=is_ut
                )
            )

        db.session.commit()

# =========================================================
# ADMIN PAGE
# =========================================================

@app.route("/admin")
def admin():

    states = State.query.all()
    monuments = Monument.query.all()

    return render_template(
        "admin.html",
        states=states,
        monuments=monuments
    )

# =========================================================
# ADD MONUMENT
# =========================================================

@app.route("/admin/monument", methods=["POST"])
def create_monument():

    try:
        name = request.form["name"]
        state_id = int(request.form["state"])

        state = State.query.get(state_id)

        if not state:
            return "State not found", 404

        monument = Monument(
            name=name,
            state=state_id
        )

        db.session.add(monument)
        db.session.commit()

        return redirect("/admin")

    except (KeyError, ValueError, TypeError):

        db.session.rollback()

        return "Invalid data", 400


# =========================================================
# ADD LOCATION
# =========================================================

@app.route("/api/locations", methods=["POST"])
def create_location():

    data = request.get_json()

    try:
        monument_id = int(data["monument"])

        if not Monument.query.get(monument_id):
            return jsonify({
                "error": "Monument not found"
            }), 404

        location = Location(
            name=data["name"],
            monument=monument_id,
            latitude=float(data["latitude"]),
            longitude=float(data["longitude"]),
            radius=float(data.get("radius", 50)),
            description=data.get("description", "")
        )

        db.session.add(location)
        db.session.commit()

        return jsonify({
            "message": "Location saved",
            "id": location.id
        }), 201

    except (KeyError, ValueError, TypeError):

        db.session.rollback()

        return jsonify({
            "error": "Invalid data"
        }), 400

@app.route("/api/delete-location/<int:location_id>", methods=["DELETE"])
def delete_location(location_id):

    location = Location.query.get(location_id)

    if not location:
        return jsonify({
            "error": "Location not found"
        }), 404

    db.session.delete(location)
    db.session.commit()

    return jsonify({
        "message": "Location deleted"
    })

# -------------------------
# Distance helper
# -------------------------

def distance_m(lat1, lon1, lat2, lon2):
    R = 6371000

    p1 = radians(lat1)
    p2 = radians(lat2)

    dp = radians(lat2 - lat1)
    dl = radians(lon2 - lon1)

    a = (
        sin(dp / 2) ** 2
        + cos(p1) * cos(p2) * sin(dl / 2) ** 2
    )

    return 2 * R * atan2(sqrt(a), sqrt(1 - a))


# -------------------------
# GET MONUMENT
# -------------------------

@app.route("/api/get-monument", methods=["POST"])
def get_monument():

    data = request.get_json()

    try:
        lat = float(data["latitude"])
        lon = float(data["longitude"])
    except (KeyError, ValueError, TypeError):
        return jsonify({
            "error": "Invalid coordinates"
        }), 400

    matches = []

    for location in Location.query.all():

        distance = distance_m(
            lat,
            lon,
            location.latitude,
            location.longitude
        )

        if distance <= location.radius:
            matches.append((distance, location))

    if not matches:
        print(f"lat: {lat}, lon: {lon}")
        return jsonify({
            "error": "No heritage monument found at this location"
        }), 404

    # Closest mapped location
    _, location = min(
        matches,
        key=lambda x: x[0]
    )

    monument = location.monument_obj
    state = monument.state_obj

    # All POIs belonging to this monument
    points_of_interest = []

    for poi in monument.locations:
        points_of_interest.append({
            "id": poi.id,
            "name": poi.name,
            "description": poi.description or ""
        })

    return jsonify({
        "state": state.name,
        "monumentName": monument.name,
        "pointsOfInterest": points_of_interest
    })


# -------------------------
# GET LOCATION
# -------------------------

@app.route("/api/get-location", methods=["POST"])
def get_location():

    data = request.get_json()

    try:
        lat = float(data["latitude"])
        lon = float(data["longitude"])
    except (KeyError, ValueError, TypeError):
        return jsonify({
            "error": "Invalid coordinates"
        }), 400

    matches = []

    for location in Location.query.all():

        distance = distance_m(
            lat,
            lon,
            location.latitude,
            location.longitude
        )

        if distance <= location.radius:
            matches.append((distance, location))

    if not matches:
        return jsonify({
            "error": "No mapped location found"
        }), 404

    distance, location = min(
        matches,
        key=lambda x: x[0]
    )

    text = get_heritage_guide(location.name,location.description)
    #audio_file = text_to_speech(text)

    return jsonify({
        "currentLocation": location.name,
        "transcript": text,
        "distance_m": round(distance, 2)
    })



with app.app_context():
    db.create_all()
    seed_states()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )